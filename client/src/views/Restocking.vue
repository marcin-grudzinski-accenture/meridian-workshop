<template>
  <div class="restocking">
    <div class="page-header">
      <h2>{{ t('restock.title') }}</h2>
      <p>{{ t('restock.description') }}</p>
    </div>

    <div class="budget-row">
      <label class="budget-label" for="budget-input">{{ t('restock.budgetLabel') }}</label>
      <input
        id="budget-input"
        v-model="budgetInput"
        type="number"
        min="0"
        step="1000"
        class="budget-input"
        :placeholder="t('restock.budgetPlaceholder')"
        @keyup.enter="loadRecommendations"
      />
      <button
        class="btn-primary"
        :disabled="loading"
        @click="loadRecommendations"
      >
        {{ t('restock.getRecommendations') }}
      </button>
    </div>

    <div v-if="loading" class="loading">{{ t('common.loading') }}</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <template v-else-if="hasLoaded">
      <div v-if="recommendations.length > 0">
        <div class="summary-bar">
          <div class="summary-item">
            <span class="summary-label">{{ t('restock.totalItems') }}</span>
            <span class="summary-value">{{ recommendations.length }}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">{{ t('restock.totalCost') }}</span>
            <span class="summary-value">${{ formatNumber(totalCost) }}</span>
          </div>
          <div v-if="budgetRemaining !== null" class="summary-item">
            <span class="summary-label">{{ t('restock.budgetRemaining') }}</span>
            <span class="summary-value" :class="budgetRemaining < 0 ? 'negative' : 'positive'">
              ${{ formatNumber(Math.abs(budgetRemaining)) }}
            </span>
          </div>
        </div>

        <div class="card">
          <div class="table-container">
            <table class="restock-table">
              <thead>
                <tr>
                  <th>{{ t('restock.table.sku') }}</th>
                  <th>{{ t('restock.table.name') }}</th>
                  <th>{{ t('restock.table.warehouse') }}</th>
                  <th>{{ t('restock.table.stock') }}</th>
                  <th>{{ t('restock.table.forecastedDemand') }}</th>
                  <th>{{ t('restock.table.trend') }}</th>
                  <th>{{ t('restock.table.suggestedQty') }}</th>
                  <th>{{ t('restock.table.unitCost') }}</th>
                  <th>{{ t('restock.table.estimatedCost') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="rec in recommendations" :key="rec.sku">
                  <td><strong>{{ rec.sku }}</strong></td>
                  <td>{{ rec.name }}</td>
                  <td>{{ rec.warehouse }}</td>
                  <td>
                    <span class="stock-display">
                      <span class="stock-on-hand">{{ rec.quantity_on_hand }}</span>
                      <span class="stock-sep">/</span>
                      <span class="stock-reorder">{{ rec.reorder_point }}</span>
                    </span>
                  </td>
                  <td>{{ rec.forecasted_demand ?? '—' }}</td>
                  <td>
                    <span v-if="rec.trend" :class="['badge', trendClass(rec.trend)]">
                      {{ rec.trend }}
                    </span>
                    <span v-else>—</span>
                  </td>
                  <td><strong>{{ rec.suggested_qty }}</strong></td>
                  <td>${{ rec.unit_cost.toFixed(2) }}</td>
                  <td><strong>${{ formatNumber(rec.estimated_cost) }}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <p>{{ t('restock.empty') }}</p>
      </div>
    </template>

    <div v-else class="prompt-state">
      <p>{{ t('restock.noBudget') }}</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { api } from '../api'
import { useFilters } from '../composables/useFilters'
import { useI18n } from '../composables/useI18n'

export default {
  name: 'Restocking',
  setup() {
    const { t } = useI18n()
    const { selectedLocation, selectedCategory, getCurrentFilters } = useFilters()

    const budgetInput = ref('')
    const recommendations = ref([])
    const loading = ref(false)
    const error = ref(null)
    const hasLoaded = ref(false)

    const totalCost = computed(() =>
      recommendations.value.reduce((sum, r) => sum + r.estimated_cost, 0)
    )
    const budgetRemaining = computed(() => {
      const b = parseFloat(budgetInput.value)
      return Number.isFinite(b) ? b - totalCost.value : null
    })

    const loadRecommendations = async () => {
      try {
        loading.value = true
        error.value = null
        const filters = getCurrentFilters()
        const b = parseFloat(budgetInput.value)
        if (Number.isFinite(b) && b > 0) filters.budget = b
        recommendations.value = await api.getRestockRecommendations(filters)
        hasLoaded.value = true
      } catch (err) {
        error.value = 'Failed to load recommendations: ' + err.message
      } finally {
        loading.value = false
      }
    }

    watch([selectedLocation, selectedCategory], () => {
      if (hasLoaded.value) loadRecommendations()
    })

    const formatNumber = (num) =>
      (num || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    const trendClass = (trend) => {
      if (trend === 'increasing') return 'trend-increasing'
      if (trend === 'decreasing') return 'trend-decreasing'
      return 'trend-stable'
    }

    return {
      t, budgetInput, recommendations, loading, error, hasLoaded,
      totalCost, budgetRemaining,
      loadRecommendations, formatNumber, trendClass
    }
  }
}
</script>

<style scoped>
.restocking {
  padding: 0;
}

.budget-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  background: white;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.budget-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
}

.budget-input {
  flex: 1;
  max-width: 220px;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #111827;
  outline: none;
  transition: border-color 0.2s;
}

.budget-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.btn-primary {
  padding: 0.5rem 1.25rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.summary-bar {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.summary-item {
  background: white;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #3b82f6;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 180px;
}

.summary-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.summary-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}

.summary-value.positive { color: #16a34a; }
.summary-value.negative { color: #dc2626; }

.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-container {
  overflow-x: auto;
}

.restock-table {
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
}

.restock-table th {
  background: #f8fafc;
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  color: #64748b;
  border-bottom: 2px solid #e2e8f0;
}

.restock-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  color: #111827;
}

.restock-table tr:hover {
  background: #f8fafc;
}

.stock-display {
  font-family: monospace;
  font-size: 0.9rem;
}

.stock-on-hand {
  color: #dc2626;
  font-weight: 600;
}

.stock-sep {
  color: #9ca3af;
  margin: 0 2px;
}

.stock-reorder {
  color: #6b7280;
}

.badge {
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.trend-increasing {
  background: #fef3c7;
  color: #92400e;
}

.trend-stable {
  background: #dbeafe;
  color: #1e40af;
}

.trend-decreasing {
  background: #dcfce7;
  color: #166534;
}

.empty-state,
.prompt-state {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.loading {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.error {
  background: #fee2e2;
  color: #991b1b;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}
</style>

import React, { useState, useEffect } from 'react'
import { usePropertyContext } from '../contexts/PropertyContext'

const Calculator = ({ property }) => {
  const { 
    calculateGrossYield, 
    calculateNetYield, 
    saveCalculation,
    getCalculationsForProperty
  } = usePropertyContext()
  
  const initialFormData = {
    monthlyRent: '',
    annualExpenses: ''
  }
  
  const [formData, setFormData] = useState(initialFormData)
  const [results, setResults] = useState(null)
  const [savedResults, setSavedResults] = useState([])
  const [isSaved, setIsSaved] = useState(false)
  
  useEffect(() => {
    // 過去の計算結果を取得
    const calculations = getCalculationsForProperty(property.id)
    setSavedResults(calculations)
    
    // 最新の計算結果があれば、フォームに初期値を設定
    if (calculations.length > 0) {
      const latest = calculations.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      )[0]
      
      setFormData({
        monthlyRent: (latest.annualRent / 12).toString(),
        annualExpenses: latest.expenses.toString()
      })
    }
  }, [property.id, getCalculationsForProperty])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setIsSaved(false)
  }
  
  const handleCalculate = (e) => {
    e.preventDefault()
    
    const monthlyRent = parseFloat(formData.monthlyRent) || 0
    const annualRent = monthlyRent * 12
    const annualExpenses = parseFloat(formData.annualExpenses) || 0
    
    // 利回り計算
    const grossYield = calculateGrossYield(property.price, annualRent)
    const netYield = calculateNetYield(property.price, annualRent, annualExpenses)
    
    // 月間キャッシュフロー
    const monthlyCashflow = monthlyRent - (annualExpenses / 12)
    
    const newResults = {
      monthlyRent,
      annualRent,
      annualExpenses,
      grossYield,
      netYield,
      monthlyCashflow
    }
    
    setResults(newResults)
    setIsSaved(false)
  }
  
  const handleSave = () => {
    if (!results) return
    
    const calculationData = {
      propertyId: property.id,
      annualRent: results.annualRent,
      monthlyRent: results.monthlyRent,
      expenses: results.annualExpenses,
      grossYield: results.grossYield,
      netYield: results.netYield,
      monthlyCashflow: results.monthlyCashflow
    }
    
    const savedCalculation = saveCalculation(calculationData)
    setSavedResults([savedCalculation, ...savedResults])
    setIsSaved(true)
  }
  
  const handleReset = () => {
    setFormData(initialFormData)
    setResults(null)
    setIsSaved(false)
  }
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">利回り計算</h2>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-medium mb-2">{property.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{property.address}</p>
        <div className="font-medium">購入価格: {property.price.toLocaleString()} 万円</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label htmlFor="monthlyRent" className="block text-sm font-medium text-gray-700">
                想定家賃収入（月額・万円）
              </label>
              <input
                type="number"
                id="monthlyRent"
                name="monthlyRent"
                value={formData.monthlyRent}
                onChange={handleChange}
                className="input-field mt-1"
                placeholder="10"
                step="0.1"
                min="0"
                required
              />
            </div>
            
            <div>
              <label htmlFor="annualExpenses" className="block text-sm font-medium text-gray-700">
                年間経費（万円）
              </label>
              <input
                type="number"
                id="annualExpenses"
                name="annualExpenses"
                value={formData.annualExpenses}
                onChange={handleChange}
                className="input-field mt-1"
                placeholder="30"
                step="0.1"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">
                管理費、修繕積立金、固定資産税、保険料など
              </p>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="btn-primary w-full"
              >
                計算する
              </button>
            </div>
          </form>
          
          {results && (
            <div className="mt-6 p-4 border rounded bg-white">
              <h3 className="font-medium mb-3">計算結果</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">年間賃料収入:</span>
                  <span className="font-medium">{results.annualRent.toLocaleString()} 万円</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">年間経費:</span>
                  <span className="font-medium">{results.annualExpenses.toLocaleString()} 万円</span>
                </div>
                
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-600">表面利回り:</span>
                  <span className="font-bold text-blue-600">{results.grossYield.toFixed(2)}%</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">実質利回り:</span>
                  <span className="font-bold text-blue-600">{results.netYield.toFixed(2)}%</span>
                </div>
                
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-600">月間キャッシュフロー:</span>
                  <span className="font-bold text-blue-600">{results.monthlyCashflow.toFixed(1)} 万円</span>
                </div>
              </div>
              
              <div className="flex mt-4 space-x-2">
                <button
                  onClick={handleSave}
                  disabled={isSaved}
                  className={`
                    px-4 py-2 text-sm rounded
                    ${isSaved 
                      ? 'bg-gray-100 text-gray-400' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'}
                  `}
                >
                  {isSaved ? '保存済み' : '結果を保存'}
                </button>
                
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  リセット
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="font-medium mb-3">過去の計算結果</h3>
          
          {savedResults.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded">
              <p className="text-gray-500">計算結果がありません</p>
              <p className="text-sm text-gray-400 mt-1">新しく計算して結果を保存してください</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日時</th>
                    <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">家賃</th>
                    <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">表面利回り</th>
                    <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">実質利回り</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {savedResults.map(result => (
                    <tr key={result.id}>
                      <td className="py-2 px-3 text-sm text-gray-500">
                        {new Date(result.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-3 text-sm text-right">
                        {result.monthlyRent.toFixed(1)}万円/月
                      </td>
                      <td className="py-2 px-3 text-sm text-right font-medium">
                        {result.grossYield.toFixed(2)}%
                      </td>
                      <td className="py-2 px-3 text-sm text-right font-medium">
                        {result.netYield.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Calculator

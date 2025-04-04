import React from 'react'
import { usePropertyContext } from '../contexts/PropertyContext'

const PropertyDetail = ({ property, onEdit, onCalculate }) => {
  const { getCalculationsForProperty } = usePropertyContext()
  
  const calculations = getCalculationsForProperty(property.id)
  
  // 計算結果を新しい順にソート
  const sortedCalculations = [...calculations].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  )
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">物件詳細</h2>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
          >
            編集
          </button>
          <button
            onClick={onCalculate}
            className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
          >
            利回り計算
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-xl">{property.name}</h3>
          <span className="px-3 py-1 bg-gray-200 rounded text-sm">
            {property.type}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">住所</h4>
            <p>{property.address}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">購入価格</h4>
            <p className="font-semibold">{property.price.toLocaleString()} 万円</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">面積</h4>
            <p>{property.size} ㎡</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">築年</h4>
            <p>{property.buildYear ? `${property.buildYear}年` : '不明'}</p>
          </div>
        </div>
        
        {property.notes && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">メモ</h4>
            <div className="bg-white p-3 rounded border">
              <p className="whitespace-pre-line text-sm">{property.notes}</p>
            </div>
          </div>
        )}
        
        <div className="mt-4 text-xs text-gray-400">
          <p>登録日: {new Date(property.createdAt).toLocaleString()}</p>
          {property.updatedAt && (
            <p>最終更新: {new Date(property.updatedAt).toLocaleString()}</p>
          )}
        </div>
      </div>
      
      {sortedCalculations.length > 0 && (
        <div className="mt-6">
          <h3 className="font-bold text-lg mb-3">最近の計算結果</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2 px-3">計算日時</th>
                  <th className="text-right py-2 px-3">家賃収入</th>
                  <th className="text-right py-2 px-3">表面利回り</th>
                  <th className="text-right py-2 px-3">実質利回り</th>
                </tr>
              </thead>
              <tbody>
                {sortedCalculations.slice(0, 5).map((calc) => (
                  <tr key={calc.id} className="border-b">
                    <td className="py-2 px-3">
                      {new Date(calc.createdAt).toLocaleString()}
                    </td>
                    <td className="text-right py-2 px-3">
                      {calc.annualRent.toLocaleString()} 万円/年
                    </td>
                    <td className="text-right py-2 px-3 font-medium">
                      {calc.grossYield.toFixed(2)}%
                    </td>
                    <td className="text-right py-2 px-3 font-medium">
                      {calc.netYield.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default PropertyDetail

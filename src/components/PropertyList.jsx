import React from 'react'
import { usePropertyContext } from '../contexts/PropertyContext'

const PropertyList = ({ onSelect, onCalculate }) => {
  const { properties, deleteProperty } = usePropertyContext()

  if (properties.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">物件が登録されていません</p>
        <p className="text-sm text-gray-400">「物件登録」ボタンから物件を追加してください</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">物件一覧</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map(property => (
          <div key={property.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg">{property.name}</h3>
              <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                {property.type}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm truncate mt-1">{property.address}</p>
            
            <div className="mt-3 border-t pt-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">購入価格</span>
                <span className="font-semibold">{property.price.toLocaleString()} 万円</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">面積</span>
                <span>{property.size} ㎡</span>
              </div>
              {property.buildYear && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">築年</span>
                  <span>{property.buildYear}年</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-between mt-4 pt-3 border-t">
              <div className="flex space-x-2">
                <button
                  onClick={() => onSelect(property.id)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                >
                  詳細
                </button>
                <button
                  onClick={() => onCalculate(property.id)}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                >
                  計算
                </button>
              </div>
              <button
                onClick={() => {
                  if (window.confirm(`「${property.name}」を削除しますか？関連する計算結果も全て削除されます。`)) {
                    deleteProperty(property.id)
                  }
                }}
                className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PropertyList

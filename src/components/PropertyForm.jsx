import React, { useState, useEffect } from 'react'
import { usePropertyContext } from '../contexts/PropertyContext'

const PropertyForm = ({ property, onComplete }) => {
  const { addProperty, updateProperty } = usePropertyContext()
  const isEditing = !!property

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    price: '',
    size: '',
    buildYear: '',
    type: 'マンション',
    notes: ''
  })

  useEffect(() => {
    if (property) {
      setFormData({
        name: property.name || '',
        address: property.address || '',
        price: property.price || '',
        size: property.size || '',
        buildYear: property.buildYear || '',
        type: property.type || 'マンション',
        notes: property.notes || ''
      })
    }
  }, [property])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // 数値型に変換
    const processedData = {
      ...formData,
      price: parseFloat(formData.price),
      size: parseFloat(formData.size),
      buildYear: formData.buildYear ? parseInt(formData.buildYear) : null
    }

    if (isEditing) {
      updateProperty(property.id, processedData)
    } else {
      addProperty(processedData)
    }

    onComplete()
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {isEditing ? '物件情報を編集' : '新規物件を登録'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">物件名</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field mt-1"
            required
            placeholder="○○マンション101号室"
          />
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">住所</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="input-field mt-1"
            required
            placeholder="東京都○○区○○町1-2-3"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">購入価格（万円）</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input-field mt-1"
              required
              min="0"
              placeholder="3000"
            />
          </div>
          
          <div>
            <label htmlFor="size" className="block text-sm font-medium text-gray-700">面積（㎡）</label>
            <input
              type="number"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="input-field mt-1"
              required
              min="0"
              step="0.01"
              placeholder="60.5"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="buildYear" className="block text-sm font-medium text-gray-700">築年数（西暦）</label>
            <input
              type="number"
              id="buildYear"
              name="buildYear"
              value={formData.buildYear}
              onChange={handleChange}
              className="input-field mt-1"
              placeholder="2010"
            />
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">物件タイプ</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="input-field mt-1"
              required
            >
              <option value="マンション">マンション</option>
              <option value="アパート">アパート</option>
              <option value="一戸建て">一戸建て</option>
              <option value="テラスハウス">テラスハウス</option>
              <option value="土地">土地</option>
              <option value="その他">その他</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">メモ</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="input-field mt-1"
            rows="3"
            placeholder="物件に関するメモを入力（最寄り駅、周辺環境など）"
          />
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onComplete}
            className="btn-secondary"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            {isEditing ? '更新する' : '登録する'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PropertyForm

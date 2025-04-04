import { useState } from 'react'
import PropertyForm from './components/PropertyForm'
import PropertyList from './components/PropertyList'
import PropertyDetail from './components/PropertyDetail'
import Calculator from './components/Calculator'
import { usePropertyContext } from './contexts/PropertyContext'
import Header from './components/Header'

function App() {
  const [activeTab, setActiveTab] = useState('list')
  const [selectedProperty, setSelectedProperty] = useState(null)
  const { properties } = usePropertyContext()

  const handlePropertySelect = (propertyId) => {
    const property = properties.find(p => p.id === propertyId)
    setSelectedProperty(property)
    setActiveTab('detail')
  }

  const handleCalculate = (propertyId) => {
    const property = properties.find(p => p.id === propertyId)
    setSelectedProperty(property)
    setActiveTab('calculator')
  }

  const handleAddNew = () => {
    setSelectedProperty(null)
    setActiveTab('form')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } border border-gray-200 rounded-l-lg`}
              onClick={() => setActiveTab('list')}
            >
              物件一覧
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'form' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } border-t border-b border-r border-gray-200`}
              onClick={handleAddNew}
            >
              物件登録
            </button>
            {selectedProperty && (
              <>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'detail' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  } border-t border-b border-r border-gray-200`}
                  onClick={() => setActiveTab('detail')}
                >
                  物件詳細
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'calculator' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  } border-t border-b border-r border-gray-200 rounded-r-lg`}
                  onClick={() => setActiveTab('calculator')}
                >
                  利回り計算
                </button>
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'list' && (
            <PropertyList 
              onSelect={handlePropertySelect} 
              onCalculate={handleCalculate}
            />
          )}
          
          {activeTab === 'form' && (
            <PropertyForm 
              property={selectedProperty}
              onComplete={() => setActiveTab('list')}
            />
          )}
          
          {activeTab === 'detail' && selectedProperty && (
            <PropertyDetail 
              property={selectedProperty}
              onEdit={() => setActiveTab('form')}
              onCalculate={() => setActiveTab('calculator')}
            />
          )}
          
          {activeTab === 'calculator' && selectedProperty && (
            <Calculator 
              property={selectedProperty}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App

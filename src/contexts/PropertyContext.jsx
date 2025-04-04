import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const PropertyContext = createContext(null);

export const usePropertyContext = () => useContext(PropertyContext);

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [calculations, setCalculations] = useState([]);

  // ローカルストレージからデータを読み込む
  useEffect(() => {
    const savedProperties = localStorage.getItem('properties');
    const savedCalculations = localStorage.getItem('calculations');
    
    if (savedProperties) {
      setProperties(JSON.parse(savedProperties));
    }
    
    if (savedCalculations) {
      setCalculations(JSON.parse(savedCalculations));
    }
  }, []);

  // データが変更されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('properties', JSON.stringify(properties));
  }, [properties]);
  
  useEffect(() => {
    localStorage.setItem('calculations', JSON.stringify(calculations));
  }, [calculations]);

  // 物件を追加する
  const addProperty = (property) => {
    const newProperty = {
      ...property,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    
    setProperties([...properties, newProperty]);
    return newProperty;
  };

  // 物件を更新する
  const updateProperty = (id, updatedProperty) => {
    const updated = properties.map(property => 
      property.id === id 
        ? { ...property, ...updatedProperty, updatedAt: new Date().toISOString() } 
        : property
    );
    
    setProperties(updated);
  };

  // 物件を削除する
  const deleteProperty = (id) => {
    setProperties(properties.filter(property => property.id !== id));
    // 関連する計算結果も削除
    setCalculations(calculations.filter(calc => calc.propertyId !== id));
  };

  // 利回り計算を保存する
  const saveCalculation = (calculation) => {
    const newCalculation = {
      ...calculation,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    
    setCalculations([...calculations, newCalculation]);
    return newCalculation;
  };

  // 特定の物件の計算結果を取得する
  const getCalculationsForProperty = (propertyId) => {
    return calculations.filter(calc => calc.propertyId === propertyId);
  };

  // 表面利回りを計算する
  const calculateGrossYield = (price, annualRent) => {
    if (!price || !annualRent || price === 0) return 0;
    return (annualRent / price) * 100;
  };

  // 実質利回りを計算する
  const calculateNetYield = (price, annualRent, expenses) => {
    if (!price || !annualRent || price === 0) return 0;
    const netIncome = annualRent - (expenses || 0);
    return (netIncome / price) * 100;
  };

  return (
    <PropertyContext.Provider value={{
      properties,
      calculations,
      addProperty,
      updateProperty,
      deleteProperty,
      saveCalculation,
      getCalculationsForProperty,
      calculateGrossYield,
      calculateNetYield
    }}>
      {children}
    </PropertyContext.Provider>
  );
};

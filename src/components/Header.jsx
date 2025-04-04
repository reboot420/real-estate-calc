import React from 'react'

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">不動産投資計算ツール</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm">シンプルに物件管理・利回り計算</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

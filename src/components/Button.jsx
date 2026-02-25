function Button({ variant = 'primary', children, onClick, className = '', type = 'button' }) {
  const baseStyles = 'transition-all text-sm rounded'
  
  const variants = {
    primary: 'bg-[#c9a875] hover:bg-[#b8976a] text-white px-6 py-2.5',
    secondary: 'bg-[#f5f1eb] hover:bg-[#ebe6dd] text-gray-700 px-4 py-2',
    pill: 'bg-white hover:bg-[#f5f1eb] border border-gray-200 text-gray-700 px-6 py-3 rounded-full',
    nav: 'text-gray-700 hover:text-gray-900 hover:bg-[#ebe6dd]/80 px-5 py-2 rounded-full',
    card: 'px-4 py-2 bg-[#c9a875] hover:bg-[#b8976a] text-white rounded-lg',
    cardSecondary: 'px-4 py-2 bg-[#f5f1eb] hover:bg-[#ebe6dd] text-gray-700 rounded-lg',
    submit: 'w-full bg-[#c9a875] hover:bg-[#b8976a] text-white py-3 rounded-lg font-medium mt-6',
    google: 'w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 px-6 py-3 rounded-lg mb-6',
    link: 'text-[#c9a875] hover:text-[#b8976a] font-medium',
    icon: 'text-gray-600 hover:text-gray-800'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button

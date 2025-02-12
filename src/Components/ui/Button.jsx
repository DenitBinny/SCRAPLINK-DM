// src/components/ui/button.jsx
export const Button = ({ children, onClick, variant = "default", className }) => {
    const variants = {
      default: "bg-blue-500 text-white",
      outline: "border border-gray-500 text-gray-700",
    };
    
    return (
      <button 
        onClick={onClick} 
        className={`px-4 py-2 rounded-md ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };
  
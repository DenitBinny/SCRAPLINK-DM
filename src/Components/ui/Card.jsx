// src/components/ui/card.jsx
export const Card = ({ children, className }) => (
    <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
  
  export const CardContent = ({ children, className }) => (
    <div className={`p-2 ${className}`}>{children}</div>
  );
  
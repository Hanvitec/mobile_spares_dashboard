const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        <div className="bg-white p-8 max-h-[95vh] scrollbar-thin overflow-auto rounded-lg shadow-lg z-10 w-full max-w-lg">
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;
  
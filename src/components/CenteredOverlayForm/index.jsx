import React from 'react';

function CenteredOverlayForm({ children }) {
  return (
    <div className="w-full max-w-screen-sm m-auto -translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2 p-4 ">
      <div className="card card-side bg-base-100 shadow-xl min-h-[500px]">
        {children}
      </div>
    </div>
  );
}

export default CenteredOverlayForm;

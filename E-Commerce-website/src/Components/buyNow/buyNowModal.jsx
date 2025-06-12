import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function BuyNowDialog({addressInfo,setAddressInfo,buyNowFunction}) {

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setAddressInfo({ ...addressInfo, [e.target.name]: e.target.value });
  };

 useEffect(()=>{
  const escapeClose=(e)=>{
    if(e.key==='Escape'){
      setIsOpen(false)
    }
  }
  if(isOpen){
    window.addEventListener('keydown',escapeClose)
  }
return ()=>{
  window.removeEventListener('keydown',escapeClose)
}
},[isOpen])

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault()
          setIsOpen(true)}}
        className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-300 cursor-pointer"
      >
        BuyNow
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            leave="ease-in duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                leave="ease-in duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" relative w-full  max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                    <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 "
              >
                <XMarkIcon className="h-6 w-6 cursor-pointer "  />
              </button>
                  <Dialog.Title className="text-lg font-semibold text-gray-800 mb-4  text-center">
                    Enter Your Details
                    <p className="text-center text-[12px] text-red-500">Press ESC to close</p>
                  </Dialog.Title>

                 

                  <form className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={addressInfo.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={addressInfo.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pincode"
                      value={addressInfo.pincode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                      type="text"
                      name="mobileNumber"
                      placeholder="Mobile Number"
                      value={addressInfo.mobileNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />

                    <button
                      type="button"
                      onClick={()=>{buyNowFunction()
                        setIsOpen(false)
                      }}
                      className="w-full py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-pink-300 cursor-pointer"
                    >
                      Order Now
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

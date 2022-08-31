import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  XCircleIcon,
  LocationMarkerIcon,
  BackspaceIcon,
  ClipboardListIcon
} from "@heroicons/react/outline";

export default function ModalComponent({
  title,
  children,
  open,
  deny,
  accept,
  onClose,
  modify
}) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="absolute z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
                      <LocationMarkerIcon
                        className="h-6 w-6 text-sky-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">{children}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                 {deny && <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-red shadow-sm px-4 py-2 bg-white-600 text-base font-medium text-white hover:border-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={deny.action}
                    title={deny.title}
                  >
                    <XCircleIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </button>}
                  {accept && <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-green shadow-sm px-4 py-2 bg-white-600 text-base font-medium text-white hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={accept.action}
                    title={accept.title}
                  >
                    <CheckCircleIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </button>}
                  {modify && (
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-gray shadow-sm px-4 py-2 bg-white-600 text-base font-medium text-white hover:border-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={modify.action}
                      title={modify.title}
                      ref={cancelButtonRef}
                    >
                      <ClipboardListIcon
                        className="h-6 w-6 text-sky-600"
                        aria-hidden="true"
                      />
                    </button>
                  )}
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-gray shadow-sm px-4 py-2 bg-white-600 text-base font-medium text-white hover:border-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onClose}
                    ref={cancelButtonRef}
                  >
                    <BackspaceIcon
                      className="h-6 w-6 text-gray-600"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

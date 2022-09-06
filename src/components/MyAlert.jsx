import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function MyAlert({
  trigger,
  close,
  messages,
  content,
  transparent,
}) {
  const contentBg = transparent ? "" : "bg-white shadow-xl";
  const width = content ? "w-fit" : "w-full";

  return (
    <Transition appear show={trigger} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={
                  width +
                  " max-w-md transform overflow-hidden rounded-2xl " +
                  contentBg +
                  " p-6 text-left align-middle transition-all"
                }
              >
                {messages?.title && (
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {messages.title}
                  </Dialog.Title>
                )}
                {messages?.content && (
                  <div className="mt-2 text-sm text-gray-500">
                    {messages.content}
                  </div>
                )}    
                {content}            
                {messages?.result ? (
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={close}
                    >
                      {messages.result}
                    </button>
                  </div>
                ):(
                  <button className="h-0 w-0 overflow-hidden" />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

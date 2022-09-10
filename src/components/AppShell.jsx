import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useUserContext,
  useUpdateUserContext,
} from "../utils/UserInfoProvider";
import AppIcon from "./AppIcon";
import { LocationMarkerIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const userRoutes = [
  { name: "Home", href: "/", current: true },
  { name: "Map", href: "/map", current: false },
  { name: "Add Poi", href: "/poi-form", current: false },
  { name: "Notifies", href: "/notifies", current: false },
  { name: "Itinerary", href: "/itinerary", current: false },
  { name: "Itineraries", href: "/itineraries", current: false },
];

const enteRoutes = [
  { name: "Home", href: "/", current: true },
  { name: "Map", href: "/map", current: false },
  { name: "Add Poi", href: "/poi-form", current: false },
  { name: "Notifies", href: "/notifies", current: false },
  { name: "Itinerary", href: "/itinerary", current: false },
  { name: "Itineraries", href: "/itineraries", current: false },
];

const publicRoutes = [
  { name: "Home", href: "/", current: true },
  { name: "Map", href: "/map", current: false },
];
//Component for app shell
export default function AppShell({ children }) {
  const userInfo = useUserContext();
  const setUserInfo = useUpdateUserContext();
  const navigate = useNavigate();
  const [navigation, setNavigation] = useState([]);

  useEffect(() => {
    userInfo.isAuth
      ? userInfo.role === "user"
        ? setNavigation(userRoutes)
        : setNavigation(enteRoutes)
      : setNavigation(publicRoutes);
    return () => {
      setNavigation([]);
    };
  }, [userInfo.isAuth]);

  const LogInButton = userInfo?.isAuth ? (
    <button
      type="button"
      className="text-white ml-3"
      onClick={() => {
        setUserInfo({
          isAuth: false,
          username: "",
          role: "",
        });
        navigate("/");
      }}
    >
      Logout
    </button>
  ) : (
    <button
      type="button"
      className="text-white ml-3"
      onClick={() => {
        navigate("/login");
      }}
    >
      Login
    </button>
  );

  const [userNavigation, setUserNavigation] = useState([
    { name: "Your Profile", href: "ancora non presente" },
    { name: "Settings", href: "ancora non presente" },
    { name: "Sign out", href: "ancora non presente" },
    { name: "Dashboard", href: "ancora non presente" },
  ]);

  function getCurrentNav() {
    return navigation.filter((nav) => {
      return nav.current === true;
    })[0];
  }

  function setCurrentToNav(nav) {
    navigation.forEach((nav) => (nav.current = false));
    setNavigation(navigation);
    setNavigation(
      navigation.map((n) =>
        n.name === nav.name ? { ...n, current: true } : { ...n }
      )
    );
  }

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {/* <LocationMarkerIcon
                        className="h-6 w-6 text-indigo-600"
                        aria-hidden="true"
                      /> color="#4287f5"*/}
                      <AppIcon color="#4287F5" />
                      {/* <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Workflow"
                      /> */}
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <button
                            key={item.name}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                            onClick={() => {
                              setCurrentToNav(item);
                              navigate(item.href);
                            }}
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <>
                            {userInfo?.isAuth && (
                              <label className="text-white mr-2" for="roles">
                                {userInfo.username}
                              </label>
                            )}
                            {LogInButton}
                          </>
                        </div>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button
                      className="bg-gray-800 inline-flex items-center justify-center p-2 
                    rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      onClick={() => {
                        setCurrentToNav(item);
                        navigate(item.href);
                      }}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="ml-3">
                      <div className="text-sm mr-3 font-medium leading-none text-gray-400">
                        {userInfo.username}
                        {LogInButton}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}

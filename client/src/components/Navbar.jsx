import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Inicio", href: "/", current: true },
  { name: "Posteos", href: "/post", current: true },
  { name: "Nuevos Posteos", href: "/add-post", current: true },
  
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const {currentUser, signout, user } = useAuth();

  return (
    <Disclosure as="nav" className="bg-gray-400 fixed w-full top-0">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
            
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex items-center justify-between h-16">
                 
                <div className="flex items-center space-x-4">
                  {/*Logo*/}
                  <img
                    className="h-8 w-auto"
                    src="https://logomaker.designfreelogoonline.com/media/productdesigner/logo/resized/000678_airplane-01.png"
                    alt="Tu Experiencia en Viajes"
                  />
                </div>

                  {/*Botones de navegación*/}
                  <div className="hidden sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-400 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <h1 className="text-white text-xl font-bold">Tu Experiencia en viajes</h1>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user && user.avatar !== null && user.avatar !== undefined ? user.avatar : "https://media.istockphoto.com/id/1298261537/es/vector/marcador-de-posici%C3%B3n-del-icono-de-la-cabeza-del-perfil-del-hombre-en-blanco.jpg?s=612x612&w=0&k=20&c=e6fPb6CH61RvtxbSfhsVInccMuXXLEkKpV6aVGfywWo="}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-400 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={classNames(
                              active ? "bg-gray-300" : "",
                              "block px-4 py-2 text-sm text-gray-700 font-bold"
                            )}
                          >
                            Perfil
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            onClick={() => signout()}
                            to="/login"
                            className={classNames(
                              active ? "bg-gray-300" : "",
                              "block px-4 py-2 text-sm text-gray-700 font-bold "
                            )}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

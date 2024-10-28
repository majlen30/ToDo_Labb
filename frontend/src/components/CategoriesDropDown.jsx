import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export function CategoriesDropDown() {
  const [chosenCategory, setChosenCategory] = useState(null);
  const menuItems = ["Matlista", "Arbete", "Fritid"];

  return (
    <Menu as="div" className="relative inline-block text-left w-32">
      <div>
        <MenuButton className="h-9 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-32">
          {chosenCategory ? chosenCategory : "Kategori"}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-gray-400"
          />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute left-1/2 z-10 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none transform -translate-x-1/2 data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in w-32"
      >
        <div className="py-1">
          {menuItems.map((item) => (
            <MenuItem key={item}>
              <a
                href="#"
                className="block w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                onClick={() => setChosenCategory(item)}
              >
                {item}
              </a>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}

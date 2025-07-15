export default function FooterLinks() {
  const menuItems = ["Home", "About", "Services", "Blog", "Support"];
  const resourceItem = ["Test Results", "Patients", "Doctors", "Health"];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      {/* Menu */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Menu</h4>
      <ul className="space-y-2 text-sm">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="hover:text-indigo-600 cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>
      </div>

      {/* Resources */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Resources</h4>
        <ul className="space-y-2 text-sm">
          {resourceItem.map((item, index) => (
            <li
              key={index}
              className="hover:text-indigo-600 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Contact</h4>
        <ul className="space-y-2 text-sm">
          <li>24 Street Name, City FI 01234, RO</li>
          <li>
            <a href="mailto:contact@template.new" className="hover:text-indigo-600">muhammadkhalil.web@gmail.com</a>
          </li>
          <li>
            <a href="tel:(004) 234 - 5678" className="hover:text-indigo-600">+92 344 9478761</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

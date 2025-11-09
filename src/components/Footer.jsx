export default function Footer() {
  return (
    <footer className="mt-12 bg-[#80B9BF]">
      <div className="p-8 flex flex-col md:flex-row justify-between items-start gap-6 text-white max-w-6xl mx-auto">
        <div>
          <div className="font-semibold">Amrei Fiedler</div>
          <div className="text-sm">Friedrichsberger Straße 53</div>
          <div className="text-sm">22081 Hamburg</div>
          <div className="mt-2 text-sm">Email: <a href="mailto:kontakt@amreifiedler.de" className="underline">kontakt@amreifiedler.de</a></div>
        </div>

        <div className="text-sm md:text-right">
          <a className="block" href="/datenschutz">Datenschutz</a>
          <a className="block" href="/impressum">Impressum</a>
          <div className="mt-4 text-xl" >
            <a href="https://www.instagram.com/yourusername" target="_blank">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}


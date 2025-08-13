import { useState } from "react";

const CheckIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" className={props.className}>
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
  </svg>
);



const Input = ({
  label,
  placeholder,
  type = "text",
  required = false,
  name,
  helper,
  value,
  onChange,
  onBlur,
  error,
}) => {
  const base =
    "mt-1 w-full rounded-2xl border bg-white/70 px-4 py-3 shadow-sm outline-none focus:ring-4";
  const ok = "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100";
  const bad = "border-rose-500 focus:border-rose-500 focus:ring-rose-100";
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-rose-500"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`${base} ${error ? bad : ok}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {helper && !error && <span className="block mt-1 text-xs text-slate-500">{helper}</span>}
      {error && (
        <span id={`${name}-error`} className="block mt-1 text-xs text-rose-600">
          {error}
        </span>
      )}
    </label>
  );
};

const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="py-16 scroll-mt-24 mt-36 sm:py-20">
    <div className="max-w-6xl px-4 mx-auto">
      <div className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-slate-900">{title}</h2>
        {subtitle && <p className="max-w-3xl mt-2 text-slate-600">{subtitle}</p>}
      </div>
      {children}
    </div>
  </section>
);

export default function LandingPage() {
  const [toast, setToast] = useState(null);

  // Controlled form state
  const [form, setForm] = useState({
    mssv: "",
    fullname: "",
    email: "",
    phone: "",
    note: "",
  });

  // Error messages per field
  const [errors, setErrors] = useState({
    mssv: "",
    fullname: "",
    email: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const setField = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    // Clear error while typing
    setErrors((e) => ({ ...e, [name]: "" }));
  };

  const validateField = (name, value) => {
    let msg = "";
    if (name === "mssv") {
      if (!value.trim()) msg = "Vui lòng nhập Mã số sinh viên.";
    }
    if (name === "fullname") {
      if (!value.trim()) msg = "Vui lòng nhập Họ và Tên.";
    }
    if (name === "email") {
      if (!value.trim()) msg = "Vui lòng nhập Email.";
      else if (!emailRegex.test(value)) msg = "Email không hợp lệ. Vui lòng kiểm tra lại.";
    }
    setErrors((e) => ({ ...e, [name]: msg }));
    return msg === "";
  };

  const validateAll = () => {
    const okMssv = validateField("mssv", form.mssv);
    const okFull = validateField("fullname", form.fullname);
    const okEmail = validateField("email", form.email);
    return okMssv && okFull && okEmail;
  };

  const scrollToFirstError = () => {
    const order = ["mssv", "fullname", "email"];
    const firstKey = order.find((k) => !validateField(k, form[k]) || errors[k]);
    if (firstKey) {
      const el = document.querySelector(`[name="${firstKey}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateAll();
    if (!isValid) {
      setToast({ type: "error", message: "Vui lòng điền đúng các trường bắt buộc (*)" });
      setTimeout(scrollToFirstError, 0);
      return;
    }
    // Demo: store to localStorage
    const key = `reg_${Date.now()}`;
    localStorage.setItem(key, JSON.stringify(form));
    setToast({ type: "success", message: "Đăng ký thành công! Chúng tôi sẽ liên hệ sớm." });
    setForm({ mssv: "", fullname: "", email: "", phone: "", note: "" });
    setErrors({ mssv: "", fullname: "", email: "" });
  };
  const roadmapItems = [
    {
      month: "Month 1",
      title: "Onboarding",
      desc: "Start working like a real studio with Agile/Scrum. You'll form teams, set up your repo, and create the foundational Game Design Document (GDD).",
      icon: <CheckIcon className="w-6 h-6" />,
      features: [
        "Team Formation & Genre Selection",
        "Repo & Asset Pipeline Setup",
        "Foundational GDD"
      ]
    },
    {
      month: "Month 2",
      title: "Development",
      desc: "Dive into hands-on development. You'll program the core game loop, establish art direction, create basic levels, and conduct internal playtests.",
      icon: <CheckIcon className="w-6 h-6" />,
      features: [
        "Core Loop Programming",
        "Art Direction & Level Design",
        "Internal Playtesting"
      ]
    },
    {
      month: "Month 3",
      title: "Refinement",
      desc: "This is the final polish phase. You'll integrate sound, implement analytics, perform Quality Assurance (QA), and prepare all the store listings for a smooth launch.",
      icon: <CheckIcon className="w-6 h-6" />,
      features: [
        "Sound & Analytics Integration",
        "Quality Assurance (QA)",
        "Store Listing Preparation"
      ]
    },
    {
      month: "Month 4",
      title: "Launch",
      desc: "The culmination of your work. You will publish your game to Google Play or the App Store, finalize reports, and have a strong, portfolio-ready product to show employers.",
      icon: <CheckIcon className="w-6 h-6" />,
      features: [
        "Mobile Game Launch",
        "Final Reports & Portfolio",
        "Career Networking"
      ]
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-slate-200">
        <div className="flex items-center justify-between h-16 max-w-6xl px-4 mx-auto">
          <div className="flex items-center gap-3">
            <img src="https://dummyimage.com/40x40/000/fff&text=GS" alt="Studio" className="w-10 h-10 shadow rounded-xl" />
            <span className="text-sm text-slate-400">×</span>
            <img src="https://dummyimage.com/40x40/f97316/fff&text=FPT" alt="ĐH FPT TP.HCM" className="w-10 h-10 shadow rounded-xl" />
            <span className="hidden ml-2 font-semibold sm:inline">Ancestral Code x FPT University</span>
          </div>
          <nav className="items-center hidden gap-6 text-sm md:flex">
            <a href="#gioi-thieu" className="hover:text-indigo-600">Giới thiệu</a>
            <a href="#muc-tieu" className="hover:text-indigo-600">Mục tiêu</a>
            <a href="#timeline" className="hover:text-indigo-600">Quy trình</a>
            <a href="#san-pham" className="hover:text-indigo-600">Sản phẩm</a>
            <a href="#dang-ky" className="font-semibold text-indigo-600 hover:text-indigo-600">Đăng ký</a>
          </nav>
          <a href="#dang-ky" className="inline-flex items-center px-4 py-2 text-sm text-white bg-indigo-600 rounded-full shadow md:hidden hover:bg-indigo-700">Đăng ký</a>
        </div>
      </header>

      {/* Hero */}
      <section id="gioi-thieu" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.08),transparent_60%)]" />
        <div className="grid max-w-6xl gap-10 px-4 py-16 mx-auto sm:py-24 lg:grid-cols-2">
          <div>
            <h1 class="text-3xl sm:text-5xl text-[#104c6b] font-bold leading-tight">
              Fuel Your Ambition. Build a Studio.
            </h1>
            <p class="mt-4 text-lg text-slate-600 max-w-lg">
              With 3-4 months bootcamp in partnership with FPT University, where you'll learn from industry experts to launch your first mobile game.
            </p>

            <div class="mt-6 pt-6">

              <div class="flex flex-col md:flex-row items-center gap-8">
                <div class="flex flex-col items-center text-center">
                  <img src="./logo.png" alt="Ancestral Code Studio" class="rounded-lg w-24 h-24 mb-2" />
                  <p class="text-md font-semibold">Ancestral Code Studio</p>
                  <p class="text-sm text-slate-600 max-w-sm mt-1">
                    Providing mentors and a professional game development pipeline.
                  </p>
                </div>
                <div class="flex flex-col items-center text-center">
                  <img src="https://dummyimage.com/60x60/f97316/fff&text=FPT" alt="FPT University" class="rounded-lg w-24 h-24 mb-2" />
                  <p class="text-md font-semibold">FPT University</p>
                  <p class="text-sm text-slate-600 max-w-md mt-1">
                    Supporting students with academic accreditation and internship credits.
                  </p>
                </div>
              </div>

            </div>

            <div class="mt-10 flex flex-wrap items-center gap-5">
              <a href="#dang-ky" class="inline-flex items-center rounded-2xl bg-[#104c6b] px-8 py-4 text-white font-semibold shadow-xl transition-all duration-300 ease-in-outhover:shadow-2xl">
                Join the Bootcamp
              </a>
              <a href="#muc-tieu" class="inline-flex items-center rounded-2xl px-8 py-4 border border-slate-300 transition-all duration-300 ease-in-out hover:border-slate-400 hover:bg-slate-50">
                Learn More
              </a>
            </div>
          </div>

          <div className="relative w-full h-[500px]">

            <img
              src="https://i1-vnexpress.vnecdn.net/2023/02/16/fptu-7390-1676520386.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=HCbWxBSY3xZ1tHnC0ood_Q"
              alt="Sinh viên FPT"
              className="object-cover w-11/12 rounded-md h-50"
            />


            <img
              src="https://www.champlain.edu/app/uploads/2024/10/game-studio-art-gallery-senior-show-2400x1350.jpg"
              alt="Phòng game"
              className="absolute right-0 object-cover w-11/12 bottom-[-70px] h-50 rounded-md"
            />
            {/* <p class="mt-6 italic text-center text-slate-600 max-w-xl mx-auto">

              Exposed to a real-world process and launch a product—that’s the focus of this partnership.

            </p> */}
          </div>

        </div>
      </section>

      <Section id="program-roadmap" title="Your Bootcamp Journey" subtitle="A structured 4-month path from idea to a published mobile game.">
        <div className="relative max-w-6xl py-20 mx-auto mt-80 md:py-36">
          <div className="flex items-center justify-between bg-[#104c6b] w-full h-2 rounded-full">
            <div className="relative grid w-8 h-8 rounded-full place-items-center">
              <div className="w-3 h-3 rounded-full bg-[#f97316]"></div>
              <div
                className={`absolute bottom-12 p-6 bg-white border rounded-3xl border-slate-200 transition-shadow duration-300 hover:shadow-xl w-64 mx-auto`}

              >
                <p className="text-sm font-semibold tracking-wide uppercase text-slate-500">{roadmapItems[0].month}</p>
                <h4 className="mt-1 text-lg font-bold text-slate-900">{roadmapItems[0].title}</h4>
                <p className="mt-2 text-sm text-slate-600">{roadmapItems[0].desc}</p>

                <ul className="mt-4 space-y-2 text-sm text-left text-slate-700">
                  {roadmapItems[0].features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckIcon className="flex-shrink-0 w-4 h-4 mt-1 text-emerald-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid w-8 h-8 rounded-full place-items-center">
              <div className="w-3 h-3 rounded-full bg-[#f97316]"></div>
              <div
                className={`absolute bottom-[180px] p-6 bg-white border rounded-3xl border-slate-200 transition-shadow duration-300 hover:shadow-xl w-64 mx-auto`}

              >
                <p className="text-sm font-semibold tracking-wide uppercase text-slate-500">{roadmapItems[1].month}</p>
                <h4 className="mt-1 text-lg font-bold text-slate-900">{roadmapItems[1].title}</h4>
                <p className="mt-2 text-sm text-slate-600">{roadmapItems[1].desc}</p>

                <ul className="mt-4 space-y-2 text-sm text-left text-slate-700">
                  {roadmapItems[1].features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckIcon className="flex-shrink-0 w-4 h-4 mt-1 text-emerald-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid w-8 h-8 rounded-full place-items-center">
              <div className="w-3 h-3 rounded-full bg-[#f97316]"></div>
              <div
                className={`absolute bottom-[180px] p-6 bg-white border rounded-3xl border-slate-200 transition-shadow duration-300 hover:shadow-xl w-64 mx-auto`}
              >
                <p className="text-sm font-semibold tracking-wide uppercase text-slate-500">{roadmapItems[2].month}</p>
                <h4 className="mt-1 text-lg font-bold text-slate-900">{roadmapItems[2].title}</h4>
                <p className="mt-2 text-sm text-slate-600">{roadmapItems[2].desc}</p>

                <ul className="mt-4 space-y-2 text-sm text-left text-slate-700">
                  {roadmapItems[2].features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckIcon className="flex-shrink-0 w-4 h-4 mt-1 text-emerald-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid w-8 h-8 rounded-full place-items-center">
              <div className="w-3 h-3 rounded-full bg-[#f97316]"></div>
              <div
                className={`absolute bottom-[180px] p-6 bg-white border rounded-3xl border-slate-200 transition-shadow duration-300 hover:shadow-xl w-64 mx-auto`}
              >
                <p className="text-sm font-semibold tracking-wide uppercase text-slate-500">{roadmapItems[3].month}</p>
                <h4 className="mt-1 text-lg font-bold text-slate-900">{roadmapItems[3].title}</h4>
                <p className="mt-2 text-sm text-slate-600">{roadmapItems[3].desc}</p>

                <ul className="mt-4 space-y-2 text-sm text-left text-slate-700">
                  {roadmapItems[3].features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckIcon className="flex-shrink-0 w-4 h-4 mt-1 text-emerald-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>


        </div>
      </Section >


      {/* Trust & Support */}
      <Section id="trust" title="Sponsor" subtitle="Ancestral Code Studio and FPT University invite top students to a unique bootcamp. Get hands-on experience in software engineering and graphic design to create and launch a mobile game">
        <div className="grid items-center gap-6 md:grid-cols-3">
          <div className="p-6 text-center bg-white border rounded-3xl border-slate-200">
            <img src="https://dummyimage.com/120x120/000/fff&text=Studio" alt="Studio" className="mx-auto rounded-2xl" />
            <p className="mt-3 text-sm text-slate-600">Professional partner, project mentor, game production process.</p>
          </div>
          <div className="p-6 text-center bg-white border rounded-3xl border-slate-200">
            <img src="https://dummyimage.com/120x120/f97316/fff&text=FPT" alt="FPT University HCMC" className="mx-auto rounded-2xl" />
            <p className="mt-3 text-sm text-slate-600">Provides academic support, internship recognition, and student assistance.</p>
          </div>
          <div className="p-6 text-center bg-white border rounded-3xl border-slate-200">
            <p className="text-sm text-slate-600">“Students get hands-on with real processes and have a product released – that’s the focus of this collaboration.”</p>
            <p className="mt-2 text-xs text-slate-500">— Program Representative</p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" title="FAQ ?">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { q: "Who can join?", a: "FPT University HCMC students, with priority for Software Engineering & Graphic Design majors; other majors can register if suitable." },
            { q: "Duration?", a: "Around 3–4 months, according to the published timeline; may be converted into internship credits per school regulations." },
            { q: "Experience required?", a: "Not mandatory. Priority for those familiar with Unity/Unreal/Godot or with a design/art UI/UX portfolio." },
            { q: "Final product?", a: "At least one complete mobile game; may be published on store or internally depending on quality evaluation." },
          ].map((f, i) => (
            <div key={i} className="p-5 bg-white border rounded-2xl border-slate-200">
              <p className="font-semibold">{f.q}</p>
              <p className="mt-1 text-sm text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Registration Form */}
      <Section id="dang-ky" title="Apply Form">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 bg-white border shadow-sm rounded-3xl border-slate-200" noValidate>
            <div className="grid gap-4">
              <Input
                label="Student ID"
                name="mssv"
                placeholder="Ex: SE123456"
                required={true}
                value={form.mssv}
                onChange={(e) => setField("mssv", e.target.value)}
                onBlur={(e) => validateField("mssv", e.target.value)}
                error={errors.mssv}
              />
              <Input
                label="Full Name"
                name="fullname"
                placeholder="Nguyen Van A"
                required={true}
                value={form.fullname}
                onChange={(e) => setField("fullname", e.target.value)}
                onBlur={(e) => validateField("fullname", e.target.value)}
                error={errors.fullname}
              />
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="you@fpt.edu.vn"
                required={true}
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                onBlur={(e) => validateField("email", e.target.value)}
                error={errors.email}
              />
              <Input
                label="Phone number"
                type="tel"
                name="phone"
                placeholder="09x xxx xxxx"
                helper="Optional"
                value={form.phone}
                onChange={(e) => setField("phone", e.target.value)}
              />
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Note</span>
                <textarea
                  name="note"
                  rows={4}
                  placeholder="Skills/experience, desired role (Dev/Artist/QA/PM)..."
                  className="w-full px-4 py-3 mt-1 border shadow-sm outline-none rounded-2xl border-slate-200 bg-white/70 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  value={form.note}
                  onChange={(e) => setField("note", e.target.value)}
                />
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-3 mt-2 font-semibold text-white bg-indigo-600 shadow-lg rounded-2xl shadow-indigo-600/20 hover:bg-indigo-700"
              >
                Apply
              </button>
              <p className="text-xs text-slate-500">
                By submitting, you agree to allow the organizers to contact you regarding program information.
              </p>
            </div>
          </form>

          <div className="p-6 bg-white border rounded-3xl border-slate-200">
            <h3 className="font-semibold">Selection Criteria</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="flex gap-2"><CheckIcon className="w-5 h-5 text-indigo-600" />Commitment of at least 12–16 weeks</li>
              <li className="flex gap-2"><CheckIcon className="w-5 h-5 text-indigo-600" />Willingness to learn & teamwork spirit</li>
              <li className="flex gap-2"><CheckIcon className="w-5 h-5 text-indigo-600" />Foundational knowledge (Dev/Art/QA/PM) is a plus</li>
            </ul>
            <div className="grid gap-4 mt-6 sm:grid-cols-2">
              <div className="p-4 border rounded-2xl border-slate-200">
                <p className="text-xs text-slate-500">Mentor</p>
                <p className="font-semibold">Senior Game Dev, Art Lead</p>
              </div>
              <div className="p-4 border rounded-2xl border-slate-200">
                <p className="text-xs text-slate-500">Format</p>
                <p className="font-semibold">Hybrid (Onsite + Online)</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/70">
        <div className="grid max-w-6xl gap-8 px-4 py-10 mx-auto text-sm md:grid-cols-3">
          <div>
            <p className="font-semibold">Ancestral Code Studio</p>
            <p className="mt-1 text-slate-600">Address: …</p>
            <p className="text-slate-600">Email: contact@studio.vn</p>
          </div>
          <div>
            <p className="font-semibold">FPT University HCMC</p>
            <p className="mt-1 text-slate-600">Program co-organizer</p>
          </div>
          <div>
            <p className="font-semibold">Quick Links</p>
            <div className="flex flex-col gap-1 mt-2">
              <a href="#gioi-thieu" className="hover:text-indigo-600">Introduction</a>
              <a href="#muc-tieu" className="hover:text-indigo-600">Objectives</a>
              <a href="#dang-ky" className="hover:text-indigo-600">Apply</a>
            </div>
          </div>
        </div>
        <div className="pb-8 text-xs text-center text-slate-500">© {new Date().getFullYear()} Ancestral Code Studio × FPT University HCMC</div>
      </footer>


      {/* Toast */}
      {
        toast && (
          <div className="fixed z-50 -translate-x-1/2 bottom-6 left-1/2">
            <div className={`rounded-2xl px-4 py-3 shadow-lg border ${toast.type === 'success' ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-rose-600 text-white border-rose-700'}`} role="alert">
              {toast.message}
            </div>
          </div>
        )
      }
    </div >
  );
}

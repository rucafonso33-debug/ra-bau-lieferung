import { useEffect, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowRight, Atom, Gauge, Microscope, ShieldAlert, Wrench } from 'lucide-react';
import { trackConversion } from './analytics';

const formSubmitEndpoint = 'https://formsubmit.co/76906bb8a1c1598dbf4103bf25227949';

const challenges = [
  'Heat-transfer limitations', 'Natural vs forced convection', 'Dew-point control',
  'Condensation & humidity', 'Condensate management', 'Chilled-water temperatures',
  'Controls & sensors', 'Thermal comfort', 'Installation constraints',
  'Energy consumption', 'Economics', 'Manufacturability',
];

const expertise = [
  'HVAC engineering', 'Thermodynamics', 'Heat transfer', 'CFD', 'Hydronics',
  'Refrigeration / heat pumps', 'Mechanical engineering', 'Product development',
  'CAD', 'Controls', 'Prototyping', 'Testing',
];

const identified = [
  'Core problem', 'Initial product hypothesis', 'Main engineering constraints',
  'Preliminary conceptual approaches', 'Target use case', 'Initial market rationale',
];

const stillToProve = [
  'Thermal feasibility', 'Useful cooling capacity', 'Condensation strategy',
  'Airflow requirements', 'Control strategy', 'Prototype architecture',
  'Energy performance', 'Manufacturability', 'Installation economics', 'Commercial viability',
];

function Mark() {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="RA Bau Tech">
      <span className="grid h-9 w-9 place-items-center rounded-full border border-cyan-300/25 bg-cyan-300/10"><Atom size={18} /></span>
      <span className="text-sm font-black tracking-[-.02em]">RA BAU <span className="text-cyan-300">TECH</span></span>
    </a>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-white/12 bg-white/[.035] px-3 py-2 text-[11px] font-bold text-slate-300">{children}</span>;
}

export default function TechLanding() {
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    trackConversion('tech_page_view', { page: 'technical_cofounder' });
    const sent = new URLSearchParams(window.location.search).get('sent');
    if (sent === '1') {
      setSubmitted(true);
      window.history.replaceState({}, '', '/tech/cofounder');
    }
  }, []);

  const begin = () => {
    trackConversion('tech_cta_click', { cta: 'explore_project' });
    document.getElementById('project')?.scrollIntoView({ behavior: 'smooth' });
  };

  const startApplication = () => {
    if (!started) {
      setStarted(true);
      trackConversion('tech_application_start', { page: 'technical_cofounder' });
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    trackConversion('tech_application_submit', { page: 'technical_cofounder' });
    const add = (name: string, value: string) => {
      const el = document.createElement('input');
      el.type = 'hidden'; el.name = name; el.value = value;
      form.appendChild(el);
    };
    add('_subject', '[RA Bau Tech] Technical Co-Founder interest');
    add('_template', 'table');
    add('_captcha', 'false');
    add('_next', window.location.origin + '/tech/cofounder?sent=1');
    form.action = formSubmitEndpoint;
    form.method = 'POST';
    form.submit();
  };

  return (
    <div id="top" className="min-h-screen bg-[#071016] text-slate-100 selection:bg-cyan-300 selection:text-[#071016]">
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#071016]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 sm:px-8">
          <Mark />
          <a href="#apply" onClick={() => trackConversion('tech_cta_click', { cta: 'header_interest' })} className="rounded-full border border-cyan-300/30 px-4 py-2 text-xs font-black text-cyan-200 transition hover:bg-cyan-300/10">Build with us</a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-white/8">
          <div className="pointer-events-none absolute inset-0 opacity-40" style={{backgroundImage:'linear-gradient(rgba(103,232,249,.055) 1px, transparent 1px),linear-gradient(90deg,rgba(103,232,249,.055) 1px,transparent 1px)',backgroundSize:'48px 48px'}} />
          <div className="pointer-events-none absolute -right-24 top-28 h-80 w-80 rounded-full bg-cyan-300/8 blur-3xl" />
          <div className="relative mx-auto grid min-h-[82svh] max-w-[1280px] items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:py-28">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[.24em] text-cyan-300">Technical Co-Founder · Switzerland</p>
              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[.95] tracking-[-.055em] text-white sm:text-6xl lg:text-[5.2rem]">
                Can existing hydronic infrastructure do <span className="text-cyan-300">more?</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                We are exploring whether existing hydronic heating infrastructure can be transformed into a practical heating <strong className="text-white">and</strong> cooling solution — without replacing the entire system.
              </p>
              <div className="mt-9 rounded-2xl border border-amber-300/25 bg-amber-300/[.055] p-5">
                <p className="text-xs font-black uppercase tracking-[.18em] text-amber-200">The position is deliberately simple</p>
                <p className="mt-2 text-xl font-black text-white">We have a hypothesis. Now we need to prove — or disprove — it.</p>
              </div>
              <button onClick={begin} className="mt-9 inline-flex min-h-13 items-center gap-3 rounded-full bg-cyan-300 px-6 text-sm font-black text-[#071016] transition hover:bg-cyan-200">
                Explore the project <ArrowDown size={17} />
              </button>
            </div>
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-0 rounded-full border border-cyan-300/10 scale-110" />
              <div className="relative aspect-square rounded-full border border-cyan-300/20 bg-[#0b1820] p-8 shadow-2xl shadow-cyan-950/30">
                <div className="grid h-full place-items-center rounded-full border border-dashed border-cyan-300/25">
                  <div className="text-center">
                    <Gauge className="mx-auto text-cyan-300" size={38} />
                    <p className="mt-5 text-[10px] font-black uppercase tracking-[.24em] text-slate-500">Existing infrastructure</p>
                    <p className="mt-2 text-2xl font-black">HEAT ↔ ? ↔ COOL</p>
                    <p className="mx-auto mt-4 max-w-[230px] text-xs leading-5 text-slate-400">The question mark is the engineering work. Not a marketing claim.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="project" className="border-b border-white/8 bg-[#0a141b]">
          <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-28">
            <p className="text-[11px] font-black uppercase tracking-[.22em] text-cyan-300">01 · The problem</p>
            <div className="mt-5 grid gap-10 lg:grid-cols-2">
              <h2 className="text-4xl font-black tracking-[-.045em] sm:text-5xl">Infrastructure already exists. Cooling needs are changing.</h2>
              <div className="space-y-5 text-base leading-7 text-slate-300">
                <p>Millions of European buildings already use hydronic heating systems. At the same time, European summers are becoming increasingly challenging and cooling demand is growing.</p>
                <p>Traditional air-conditioning retrofits can require additional equipment, installation and infrastructure. Replacing existing emitters with fan-coil units is possible — but it means replacing equipment already installed in buildings.</p>
                <p className="font-bold text-white">Could part of the existing hydronic infrastructure be reused instead?</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/8">
          <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[.22em] text-cyan-300">02 · Engineering challenge</p>
                <h2 className="mt-5 text-4xl font-black tracking-[-.045em]">These are not footnotes.<br/><span className="text-cyan-300">These are the engineering problem.</span></h2>
                <p className="mt-6 text-sm leading-6 text-slate-400">We are not assuming away the hard parts. The architecture remains open until evidence closes it.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {challenges.map((item, i) => <div key={item} className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/[.025] p-4"><span className="text-[10px] font-black text-cyan-300">{String(i+1).padStart(2,'0')}</span><span className="text-sm font-bold">{item}</span></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/8 bg-[#0a141b]">
          <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-28">
            <p className="text-[11px] font-black uppercase tracking-[.22em] text-cyan-300">03 · What we are building</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-black tracking-[-.045em] sm:text-5xl">A retrofit hypothesis, not a frozen product.</h2>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">We are exploring a retrofit approach intended to transform existing hydronic emitters into more capable heating/cooling terminal units while preserving as much existing infrastructure as technically reasonable.</p>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400">The concept may involve thermal, airflow, mechanical and control engineering. Its final architecture has <strong className="text-white">not</strong> been frozen. The first mission is not to manufacture. It is to determine whether the physics and economics justify building the product.</p>
            <div className="mt-10 flex flex-wrap gap-2">{['THERMAL','AIRFLOW','MECHANICAL','CONTROLS','TESTING'].map(x=><Pill key={x}>{x}</Pill>)}</div>
          </div>
        </section>

        <section className="border-b border-white/8">
          <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-28">
            <p className="text-[11px] font-black uppercase tracking-[.22em] text-cyan-300">04 · Why this may matter</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-black tracking-[-.045em] sm:text-5xl">Retrofit may be the practical bridge between what buildings have and what they increasingly need.</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {['Large installed base of hydronic heating systems','Increasing cooling requirements','Growing adoption of reversible heat pumps','Pressure to improve existing buildings rather than rebuild everything'].map(x=><div key={x} className="rounded-2xl border border-white/8 bg-white/[.025] p-6 text-sm font-bold">{x}</div>)}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-7 text-slate-400">If technically and commercially viable, the addressable opportunity could be significant. That remains a thesis to validate — not a market-size claim.</p>
          </div>
        </section>

        <section className="border-b border-white/8 bg-[#0a141b]">
          <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-28">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div><p className="text-[11px] font-black uppercase tracking-[.22em] text-cyan-300">05 · Current stage</p><h2 className="mt-5 text-4xl font-black tracking-[-.045em]">Concept / pre-validation.</h2></div>
              <span className="rounded-full border border-amber-300/25 bg-amber-300/[.05] px-4 py-2 text-xs font-black text-amber-200">NO VALIDATED PROTOTYPE</span>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-emerald-300/15 bg-emerald-300/[.035] p-6"><p className="text-xs font-black uppercase tracking-[.16em] text-emerald-300">Already identified</p><ul className="mt-5 space-y-3 text-sm text-slate-300">{identified.map(x=><li key={x}>— {x}</li>)}</ul></div>
              <div className="rounded-2xl border border-amber-300/15 bg-amber-300/[.035] p-6"><p className="text-xs font-black uppercase tracking-[.16em] text-amber-200">Still to prove</p><ul className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">{stillToProve.map(x=><li key={x}>— {x}</li>)}</ul></div>
            </div>
          </div>
        </section>

        <section className="border-b border-cyan-300/15 bg-cyan-300 text-[#071016]">
          <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-24">
            <p className="text-[11px] font-black uppercase tracking-[.22em]">06 · First milestone</p>
            <h2 className="mt-5 max-w-5xl text-4xl font-black tracking-[-.05em] sm:text-6xl">The first milestone is not a company valuation.<br/>It is a working experiment.</h2>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-[#071016]/15 sm:grid-cols-2 lg:grid-cols-4">
              {['Define requirements','Model the physics','Build a simple test rig','Instrument it','Measure performance','Identify failure modes','Iterate','Continue — or kill it'].map((x,i)=><div key={x} className="bg-cyan-300 p-5"><span className="text-[10px] font-black opacity-50">0{i+1}</span><p className="mt-2 text-sm font-black">{x}</p></div>)}
            </div>
          </div>
        </section>

        <section className="border-b border-white/8">
          <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-28">
            <p className="text-[11px] font-black uppercase tracking-[.22em] text-cyan-300">07 · The role</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-black tracking-[-.05em] sm:text-6xl">We are not hiring an employee.<br/><span className="text-cyan-300">We are looking for a Technical Co-Founder.</span></h2>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">Strong capability in one or more of these areas is relevant:</p>
            <div className="mt-7 flex flex-wrap gap-2">{expertise.map(x=><Pill key={x}>{x}</Pill>)}</div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              <div className="rounded-2xl border border-white/8 p-6"><Microscope className="text-cyan-300"/><h3 className="mt-4 font-black">Intellectually honest</h3><p className="mt-2 text-sm leading-6 text-slate-400">Comfortable saying “this won't work” when the evidence points there.</p></div>
              <div className="rounded-2xl border border-white/8 p-6"><Wrench className="text-cyan-300"/><h3 className="mt-4 font-black">Experimental</h3><p className="mt-2 text-sm leading-6 text-slate-400">Able to turn theory into instrumented experiments and learn quickly.</p></div>
              <div className="rounded-2xl border border-white/8 p-6"><ArrowRight className="text-cyan-300"/><h3 className="mt-4 font-black">Entrepreneurial</h3><p className="mt-2 text-sm leading-6 text-slate-400">Persistent, comfortable with uncertainty, and interested in building from zero.</p></div>
            </div>
          </div>
        </section>

        <section className="border-b border-red-300/10 bg-[#120d10]">
          <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-28">
            <ShieldAlert className="text-red-300" size={34}/>
            <p className="mt-6 text-[11px] font-black uppercase tracking-[.22em] text-red-300">08 · The reality</p>
            <h2 className="mt-4 text-5xl font-black tracking-[-.055em] sm:text-7xl">This could fail.</h2>
            <div className="mt-8 max-w-3xl space-y-3 text-lg leading-8 text-slate-300">
              <p>There is currently no guarantee that the concept is technically viable.</p><p>There is no guarantee of investment.</p><p>There is no guarantee of salary.</p><p>There is no guarantee of commercial success.</p>
            </div>
            <p className="mt-8 max-w-3xl text-base leading-7 text-slate-400">We may spend months solving the problem and discover that the correct engineering conclusion is to stop. That is part of the process. But if the hypothesis survives engineering validation and the economics work, we believe there may be an opportunity to build something meaningful.</p>
          </div>
        </section>

        <section className="border-b border-white/8 bg-[#0a141b]">
          <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-28">
            <p className="text-[11px] font-black uppercase tracking-[.22em] text-cyan-300">09 · Founder</p>
            <div className="mt-6 grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
              <div><h2 className="text-4xl font-black tracking-[-.045em]">Rodrigo Afonso</h2><p className="mt-2 text-sm font-bold text-cyan-300">Founder — RA Bau Tech · Switzerland</p></div>
              <div className="text-base leading-7 text-slate-300"><p>Rodrigo originated the product hypothesis from observing the intersection between construction, building systems, retrofit constraints and market opportunity.</p><p className="mt-5">His expected focus is vision, business development, market validation, commercial strategy, partnerships, execution and company building. The Technical Co-Founder would own or co-own the scientific and engineering validation.</p></div>
            </div>
          </div>
        </section>

        <section id="apply" className="bg-[#071016]">
          <div className="mx-auto max-w-[900px] px-5 py-20 sm:px-8 lg:py-28">
            <p className="text-[11px] font-black uppercase tracking-[.22em] text-cyan-300">10 · Founder conversation</p>
            <h2 className="mt-5 text-4xl font-black tracking-[-.05em] sm:text-6xl">Interested in building this?</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400">Detailed technical architecture is shared selectively during the evaluation process. No NDA is required to express interest.</p>

            {submitted ? (
              <div className="mt-10 rounded-2xl border border-emerald-300/20 bg-emerald-300/[.05] p-8">
                <p className="text-xl font-black text-white">Thank you.</p><p className="mt-2 text-sm leading-6 text-slate-300">Relevant profiles will be contacted directly for an initial founder conversation.</p>
              </div>
            ) : (
              <form onSubmit={submit} onFocus={startApplication} className="mt-10 space-y-7 rounded-3xl border border-white/10 bg-white/[.025] p-5 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  {[
                    ['Name','name','text',true],['Email','email','email',true],['LinkedIn profile','linkedin','url',true],
                    ['Current location','location','text',true],['Current role','current_role','text',true],['Primary technical expertise','expertise','text',true],
                  ].map(([label,name,type,required])=><label key={String(name)} className="grid gap-2 text-xs font-black text-slate-300">{label as string}<input required={Boolean(required)} name={name as string} type={type as string} className="h-12 rounded-xl border border-white/12 bg-[#09141b] px-4 text-base font-normal text-white outline-none focus:border-cyan-300/60 sm:text-sm"/></label>)}
                </div>
                {[
                  ['What part of this engineering problem interests you most?','interest'],
                  ['What do you believe is the biggest technical reason this concept could fail?','failure_reason'],
                  ['How would you approach validating the concept before designing a commercial product?','validation_approach'],
                  ['Have you previously built, tested or developed physical products? Briefly explain.','physical_products'],
                ].map(([label,name],i)=><label key={name} className="grid gap-2 text-xs font-black text-slate-300"><span><span className="mr-2 text-cyan-300">{i+1}.</span>{label}</span><textarea required name={name} rows={4} className="rounded-xl border border-white/12 bg-[#09141b] p-4 text-base font-normal leading-6 text-white outline-none focus:border-cyan-300/60 sm:text-sm"/></label>)}
                <label className="grid gap-2 text-xs font-black text-slate-300">5. Are you interested specifically in joining as a co-founder rather than as an employee or consultant?<select required name="cofounder_interest" className="h-12 rounded-xl border border-white/12 bg-[#09141b] px-4 text-sm font-normal text-white"><option value="">Select…</option><option>YES</option><option>MAYBE</option><option>NO</option></select></label>
                <label className="grid gap-2 text-xs font-black text-slate-300">6. At this stage there may be no salary and no guarantee that the concept succeeds. Are you comfortable exploring the project under those conditions?<select required name="risk_acceptance" className="h-12 rounded-xl border border-white/12 bg-[#09141b] px-4 text-sm font-normal text-white"><option value="">Select…</option><option>YES</option><option>NEED TO DISCUSS</option><option>NO</option></select></label>
                <label className="grid gap-2 text-xs font-black text-slate-300">7. How much time could you realistically dedicate during the initial validation phase?<select required name="weekly_time" className="h-12 rounded-xl border border-white/12 bg-[#09141b] px-4 text-sm font-normal text-white"><option value="">Select…</option><option>&lt;5 h/week</option><option>5–10 h/week</option><option>10–20 h/week</option><option>20+ h/week</option></select></label>
                <button type="submit" className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 text-sm font-black text-[#071016] transition hover:bg-cyan-200">Submit interest <ArrowRight size={17}/></button>
                <p className="text-center text-[11px] leading-5 text-slate-500">Thank you. Relevant profiles will be contacted directly for an initial founder conversation.</p>
              </form>
            )}
          </div>
        </section>
      </main>
      <footer className="border-t border-white/8 px-5 py-8 text-center text-[11px] text-slate-600">© 2026 RA Bau Tech · Switzerland · Early-stage R&D concept</footer>
    </div>
  );
}

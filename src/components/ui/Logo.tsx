import logo from '@/assets/kommit-logo.png'

export default function Logo() {
  return (
    <div className="flex items-center gap-[3px]">
      <div className="relative h-[28.671px] w-[35.128px] shrink-0">
        <div className="absolute top-[4.34px] left-[7.08px] h-[19.516px] w-[20.479px] bg-white" />
        <img alt="" src={logo} className="absolute inset-0 size-full object-cover" />
      </div>
      <span className="text-xl leading-7 font-bold tracking-[-0.5px] text-logo-text">Kommit</span>
    </div>
  )
}

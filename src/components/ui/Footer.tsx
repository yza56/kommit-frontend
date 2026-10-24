import { footerTexts } from '@/data/footer'

export default function Footer() {
  return (
    <footer className="flex w-full flex-wrap items-center justify-center gap-x-[3px] px-4 py-10 text-center text-sm leading-5 text-label">
      <p>
        {footerTexts.createdBy}{' '}
        <a href={footerTexts.authorUrl} target="_blank" rel="noopener noreferrer" className="font-bold">
          {footerTexts.author}
        </a>{' '}
        {footerTexts.copyrightSign}
      </p>
      <p>{footerTexts.rights}</p>
    </footer>
  )
}

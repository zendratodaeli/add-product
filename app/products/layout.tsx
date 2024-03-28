export const metadata = {
  title: 'Products'
}

export default function ProductLayout({children} : {children: React.ReactNode}) {
  return (
    <div className="py-10 px-10">
      {children}
    </div>
  )
}

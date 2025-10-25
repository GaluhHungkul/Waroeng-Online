import { Search, User, X } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { Input } from '../ui/input'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'


const AccountAndSearchBar = () => {

    const searchParams = useSearchParams()

    const [showSearchBar, setShowSearchBar] = useState(false)
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "")

    const router = useRouter()

    const handleSearchProducts = (e: FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim().length) return
        router.push(`/products/search?q=${searchQuery}`);
    };

  return (
    <div className="flex items-center gap-4">
        <form onSubmit={handleSearchProducts} className="relative">
           <AnimatePresence>
                {showSearchBar && (
                    <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="relative"
                    >
                    <X className="absolute -left-8 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-primary-orange" onClick={() => setShowSearchBar(false)}/>
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products"
                        className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary-orange text-gray-400 focus:text-gray-600 py-5"
                        autoFocus
                    />
                    </motion.div>
                )}
            </AnimatePresence>
            <Search onClick={() => { if(!showSearchBar) setShowSearchBar(true) }} className="text-gray-700 hover:text-primary-orange duration-100 cursor-pointer absolute right-2 top-1/2 -translate-y-1/2"/>
        </form>
        <Link href={`/profile/account`}  >
            <User className="text-gray-700 hover:text-primary-orange duration-100"/>
        </Link>
    </div>
  )
}

export default AccountAndSearchBar
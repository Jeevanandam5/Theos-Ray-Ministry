import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchIcon, Menu, X, TicketPlus } from 'lucide-react';
import { SignInButton, useUser, UserButton } from '@clerk/clerk-react';
import assets from '../assets/data/assets';

export const NavBar = () => {
    const { isSignedIn } = useUser();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Handle search
    const handleSearch = () => {
        if (!searchTerm.trim()) return;

        const term = searchTerm.toLowerCase().trim();

        // Find subject whose title includes the search term (anywhere, case-insensitive)
        const found = assets.find(item =>
            item.title.toLowerCase().includes(term)
        );

        if (found) {
            navigate(`/subject/${found._id}`);
            setSearchTerm('');
            setShowSearch(false);
        } else {
            alert('No subject found!');
        }
    };


    return (
        <div className="w-full bg-gray-200 shadow-md">
            <div className="flex items-center justify-between px-4 md:px-16 lg:px-36 py-3">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <h1 className="font-bold text-lg md:text-2xl text-primary shadow-sm shadow-amber-50 px-2 py-1 rounded-md">
                        Theos Ray Ministry
                    </h1>
                </Link>

                {/* Desktop Search Bar */}
                <div className="hidden md:flex items-center bg-white rounded-full px-3 py-1 shadow-inner focus-within:shadow-md transition-all">
                    <SearchIcon
                        className="w-5 h-5 text-gray-500 cursor-pointer"
                        onClick={handleSearch}
                    />
                    <input
                        type="search"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        className="border-none bg-transparent outline-none px-2 text-sm w-40 focus:w-56 transition-all duration-300" />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-4">
                    {!isSignedIn ? (
                        <SignInButton mode="modal">
                            <button className="px-4 py-2 bg-primary hover:bg-primary/90 transition rounded-lg font-medium text-white shadow-md hover:shadow-lg cursor-pointer">
                                Sign In
                            </button>
                        </SignInButton>
                    ) : (
                        <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Action
                                    label="Watch Later"
                                    labelIcon={<TicketPlus width={15} />}
                                    onClick={() => navigate('/watchlater')}
                                />
                            </UserButton.MenuItems>
                        </UserButton>
                    )}
                </div>

                {/* Mobile Icons */}
                <div className="flex items-center gap-3 md:hidden">
                    <SearchIcon
                        className="w-6 h-6 text-gray-700 cursor-pointer"
                        onClick={() => setShowSearch(!showSearch)} />
                    {menuOpen ? (
                        <X
                            className="w-6 h-6 text-gray-700 cursor-pointer"
                            onClick={() => setMenuOpen(false)} />
                    ) : (
                        <Menu
                            className="w-6 h-6 text-gray-700 cursor-pointer"
                            onClick={() => setMenuOpen(true)} />
                    )}
                </div>
            </div>

            {/* Mobile Search Bar */}
            {showSearch && (
                <div className="px-4 pb-3 md:hidden">
                    <div className="flex items-center bg-white rounded-full px-3 py-1 shadow-inner animate-fadeIn">
                        <SearchIcon
                            className="w-5 h-5 text-gray-500 cursor-pointer"
                            onClick={handleSearch}
                        />
                        <input
                            type="search"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="border-none bg-transparent outline-none px-2 text-sm w-full"
                            autoFocus />
                    </div>
                </div>
            )}

            {/* Mobile Menu (SignIn/UserButton) */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-3 flex flex-col gap-3 animate-fadeIn">
                    {!isSignedIn ? (
                        <SignInButton mode="modal">
                            <button className="px-4 py-2 bg-primary hover:bg-primary/90 transition rounded-lg font-medium text-white shadow-md hover:shadow-lg cursor-pointer">
                                Sign In
                            </button>
                        </SignInButton>
                    ) : (
                        <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Action
                                    label="Watch Later"
                                    labelIcon={<TicketPlus width={15} />}
                                    onClick={() => {
                                        navigate('/watchlater');
                                        setMenuOpen(false);
                                    }}
                                />
                            </UserButton.MenuItems>
                        </UserButton>
                    )}
                </div>
            )}
        </div>
    );
};

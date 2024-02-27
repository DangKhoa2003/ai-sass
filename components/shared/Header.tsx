const Header = ({ title, subtitle }: { title: string; subtitle?: string }) => {
    return (
        <>
            <h2 className="h2-bold text-[#0D1221]">{title}</h2>
            {subtitle && <p className="p-16-regular text-gray-500 mt-4">{subtitle}</p>}
        </>
    );
};

export default Header;

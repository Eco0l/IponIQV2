type Props = {
    children: React.ReactNode;

};

export const StickyWrapper = ({ children }: Props ) =>{
    return (
        <div className="hidden lg:block w-[368px] stick self-end bottom-6">
            <div className="min-h-[calc(100vh-48px)] stick top-6 flex flex-col gap-y-4">
                {children}
            </div>
        </div>
    )
}
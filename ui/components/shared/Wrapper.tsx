import React from 'react'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full justify-center items-center flex ">
            <div className="flex flex-col  w-full max-w-220 gap-8 md:p-6">
                {children}
            </div>
        </div>
    )
}

export default Wrapper
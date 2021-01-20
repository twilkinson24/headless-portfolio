import React from 'react';

/* This component is not used anywhere. These are the Tailwind CSS classes
 * used in the data coming from WP. This way, they aren't purged in the build 
 */ 

function SinglePageBlank({ data }) {
    return (
        <div>
            <div className="text-sm inline-block lg:inline xl:inline list-disc pl-4 sm:inline mx-auto sm:-mx-5 -my-2 flex flex-wrap justify-center max-w-xs sm:max-w-full px-5 py-2">
                Homepage Testimonial 
                <ul className="list-disc">
                    <li>li</li>
                </ul>
                <div className="max-w-3xl mx-auto text-center text-base md:text-lg lg:text-xl leading-9 font-medium text-black md:text-white">
                    <div className="absolute left-0 top-full right-full opacity-25 z-0 hidden xl:block transform -translate-y-6 xl:-translate-y-10 xl:-translate-x-10"></div>
                </div>
                Footer
                <div className="mr-5 text-base no-underline leading-6 text-gray-500 hover:text-gray-400 py-12">
                    <div className="md:flex md:items-center md:justify-center sm:hidden hidden sm:inline-block"></div>
                </div>
                Process Page
                <div className="relative bg-gray-50 overflow-hidden mb-20">
                    <div className="hidden md:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full">
                        <div className="relative h-full max-w-screen-xl mx-auto">
                        <svg className="absolute opacity-25 left-0 transform -translate-x-1/4 lg:-translate-x-1/2" width="404" height="784" fill="none" viewBox="0 0 404 784">
                            <defs>
                            <pattern id="f210dbf6-a58d-4871-961e-36d5016a0f49" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <rect x="0" y="0" width="4" height="4" className="text-gray" fill="currentColor"></rect>
                            </pattern>
                            </defs>
                            <rect width="404" height="784" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"></rect>
                        </svg>
                        <svg className="absolute opacity-25 right-0 transform -translate-x-1/4  lg:translate-x-1/2" width="404" height="784" fill="none" viewBox="0 0 404 784">
                            <defs>
                            <pattern id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <rect x="0" y="0" width="4" height="4" className="text-gray" fill="currentColor"></rect>
                            </pattern>
                            </defs>
                            <rect width="404" height="784" fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"></rect>
                        </svg>
                        </div>
                    </div>
                    

                    <div className="relative pt-6 pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">

                        <main className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
                        <div className="text-center">
                            <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-black sm:text-5xl sm:leading-none md:text-6xl">
                            The
                                <br className="xl:hidden" />
                                <span className="text-blue">Process</span>
                            </h2>
                            <p className="mt-3 max-w-md mx-auto text-base text-gray sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            The steps we’ll work through on your web project to provide a well thought out, consistent, and strategic approach and make sure your new website is a success.
                            </p>
                            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                            <div>
                                <a href="https://stevenorechow.typeform.com/to/jXVojP5Y" className="button">
                                Get started
                                </a>
                            </div>
                            <div className="mt-3 sm:mt-0 sm:ml-3">
                                <a href="https://hopeful-ritchie-a0fd00.netlify.app/portfolio/" className="button bg-white">
                                See My Work
                                </a>
                            </div>
                            </div>
                        </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}
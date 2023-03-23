const ButtonGroup = ({ title1, title2 }) => {
    return (
        <div className="flex items-center justify-center">
            <div
                className="inline-flex active:shadow-primary-800 bg-primary rounded-2xl"
                role="group"
            >
                <button
                    type="button"
                    className="inline-block rounded-2xl bg-primary-800 px-6 pt-2.5 pb-2 text-md font-sm uppercase leading-normal text-accent-100 transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
                >
                    {title1}
                </button>
                <button
                    type="button"
                    className="inline-block rounded-r-2xl bg-primary px-6 pt-2.5 pb-2 text-md font-sm uppercase leading-normal text-accent-100 transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
                >
                    {title2}
                </button>
            </div>
        </div>
    );
}

export default ButtonGroup;
export const Filter = ({ toSortBy }) => {
    const sortButtonParams = ["title", "author", "year", "price"];
    return (
        <>
            <h6 className="text-primary">Sort books by:</h6>
            <div className="btn-group" role="group" aria-label="outlined design books filters">

                {
                    sortButtonParams.map((btnName, i) => <button type="button" key={`${btnName}-${i}`} onClick={toSortBy} className="btn btn-outline-primary">{btnName}</button>)
                }
            </div>
        </>
    );
};


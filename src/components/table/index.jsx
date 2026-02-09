const Table = ({ title, columns, data, headerAction }) => {
  const rows = Object.values(data);
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">

            <div className="TableHeader">
              <div className="row">
                <div className="col-lg-3">
                  <h4 className="card-title">{title}</h4>
                </div>
                <div className="col-lg-9 text-right">
                  {headerAction}
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table mb-0 listingData dt-responsive">
                <thead>
                  <tr>
                    {columns?.map((col, index) => (
                      <th key={index}>{col.header}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows?.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length} className="text-center">
                        No data found
                      </td>
                    </tr>
                  ) : (
                    rows?.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {columns?.map((col, colIndex) => (
                          <td key={colIndex}>
                            {col?.render
                              ? col?.render(row)
                              : row[col?.accessor]}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;

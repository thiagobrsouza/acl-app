export function Card({ xxl, xl, lg, md, sm, xs, children, title }) {
  return (
    <div className={`col-xxl-${xxl} col-xl-${xl} col-lg-${lg} col-md-${md} col-sm-${sm} col-xs-${xs}`}>

      <div className="card">
        <div className="card-header">
          <h5 className="card-title text-center">{title}</h5>
        </div>
        <div className="card-body">
          { children }
        </div>
      </div>

    </div>
  )
}
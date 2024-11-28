/* Styles *********************************************************************/
import "../styles/components/SpinningLoader.scss";

/* Component FNC **************************************************************/
export default function SpinningLoader(): JSX.Element {
  /* Jsx **********************************************************************/
  return (
    <div className="spinning-loader">
      <span className="spinning-loader__text">Fetching data...</span>
      <div className="spinning-loader__circle" />
    </div>
  );
}

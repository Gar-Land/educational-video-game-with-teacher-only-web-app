import {Link} from "react-router-dom";

const ListLinkItem = ({config}) => {
  return (
    <Link to={config.href} key={config.title} className={config.styles.wrapper}>
      <h3 className={config.styles.title}>{config.title}</h3>
      <p className={config.styles.content}>{config.content}</p>
    </Link>
  );
};

export default ListLinkItem;
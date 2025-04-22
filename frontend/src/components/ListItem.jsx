const ListItem = ({config}) => {
  return (
    <li key={config.title} className={config.styles.wrapper}>
      <h3 className={config.styles.title}>{config.title}</h3>
      <p className={config.styles.content}>
        {config.content.nonbold}
        {config.content.bold && 
          <span className="font-semibold">{config.content.bold}</span>
        }
      </p>
    </li>
  );
};

export default ListItem;
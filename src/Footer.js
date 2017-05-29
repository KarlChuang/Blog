import React from 'react';
import { connect } from 'react-redux';
import { setVisibilityFilter } from '../redux/ActionCreator';

const mapStateToLinkProps = (state, props) => ({
  action: state.visibilityFilter === props.filter,
});
const mapDispatchToLinkProps = (dispatch, props) => ({
  onClick: (e) => {
    e.preventDefault();
    dispatch(setVisibilityFilter(props.filter));
  },
});

const Link = ({
  action,
  onClick,
  children,
}) => {
  if (action) {
    return (
      <span>{children}</span>
    );
  }
  return (
    <a
      href="#"
      onClick={e => onClick(e)}
    >
      {children}
    </a>
  );
};

const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps,
)(Link);

const Footer = () => (
  <p style={{ fontSize: '12px', marginLeft: '0px' }}>
  SHOW:
    {' '}
    <FilterLink filter="SHOW_ALL">ALL</FilterLink>
    {' '}
    <FilterLink filter="SHOW_ACTIVE">ACTIVE</FilterLink>
    {' '}
    <FilterLink filter="SHOW_COMPLETED">COMPLETED</FilterLink>
  </p>
);

export default Footer;

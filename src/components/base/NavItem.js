import React, { PropTypes, Component } from "react";
import classNames from 'classnames';
import { NavLink } from "fluxible-router";

class NavItem extends Component {
  static propTypes = {
    linkId: PropTypes.string,
    onSelect: PropTypes.func,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    href: PropTypes.string,
    role: PropTypes.string,
    title: PropTypes.node,
    eventKey: PropTypes.any,
    target: PropTypes.string,
    key: PropTypes.any,
    routeName: PropTypes.string,
    navParams: PropTypes.object,
    children: React.PropTypes.node,
    'aria-controls': PropTypes.string
  }

  static defaultProps = {
    active: false,
    disabled: false
  }

  render() {
    let {
      role,
      linkId,
      disabled,
      active,
      href,
      title,
      target,
      children,
      key,
      routeName,
      navParams,
      'aria-controls': ariaControls,
      ...props } = this.props;

    let classes = {
        active,
        disabled
      };
    let linkProps = {
      role,
      href,
      title,
      target,
      id: linkId,
      key,
      routeName,
      navParams
    };

    if (!role && href === '#') {
      linkProps.role = 'button';
    }

    return (
      <li {...props} role='presentation' className={classNames(props.className, classes)}>
        <NavLink {...linkProps} aria-selected={active} aria-controls={ariaControls}>
          { children }
        </NavLink>
      </li>
    );
  }
}

export default NavItem;

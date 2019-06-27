import React, { Component } from 'react'
import { Menu, Dropdown, Icon } from 'antd'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import 'antd/dist/antd.css'
import logo from '../../../../img/logo2.png'
import avatar from '../../../../img/avatar.png'
import notification from '../../../../img/notification.svg'
import cart from '../../../../img/cart.svg'
import dollar from '../../../../img/dollar.svg'
import { connect } from 'react-redux'

class Header extends Component {
  state = {
    firstName: 'User',
  }

  handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = `${window.location.origin}/`
  }

  render() {
    const { user } = this.props,
      menu = (
        <Menu>
          <Menu.Item>
            <Link to="/admin/profile_settings">Настройки профиля</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/admin/company_settings">Настройки компании</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/admin/employees">Сотрудники</Link>
          </Menu.Item>
          <Menu.Item onClick={this.handleLogout}>Выход</Menu.Item>
        </Menu>
      )
    return (
      <div className="container">
        <header>
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
            Buy and Sale
          </div>

          {/*<div className={styles.notification}>*/}
          {/*<a href="#">*/}
          {/*<img src={notification} alt=""/>*/}
          {/*/!*<span className={styles.alert}>1</span>*!/*/}
          {/*</a>*/}
          {/*</div>*/}
          {/*<div className={styles.cart}>*/}
          {/*<Link to="/admin/cart">*/}
          {/*<img src={cart} alt=""/>*/}
          {/*/!*<span className={styles.alert}>1</span>*!/*/}
          {/*</Link>*/}
          {/*</div>*/}

          <div className={styles.balanceBlock}>
            <div>
              <p>Баланс:</p>
            </div>

            <div className={styles.balanceBox}>
              <div className={styles.dollarIcon}>
                <img src={dollar} alt="" />
              </div>
              <div>
                <span>0.00</span> грн
              </div>
            </div>
          </div>

          <div className={styles.userBlock}>
            <div className={styles.avatar}>
              <img src={user.avatarImage || avatar} alt="" />
            </div>
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
                <div className={styles.nameBlock}>
                  <span className={styles.name}>
                    {user.firstName || 'User'}
                  </span>
                  <span>
                    {user.role === 'PARTNER' ? 'Продавец' : 'Поставщик'}
                  </span>
                </div>
                <Icon type="down" />
              </a>
            </Dropdown>
          </div>
        </header>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

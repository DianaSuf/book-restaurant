import { Helmet } from 'react-helmet-async';
import './table-screen.css'
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import { useAppSelector, useAppDispatch } from '../../../hooks/hook';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../../const';
import { fetchTableAction, fetchTableAdminAction } from '../../../store/api-actions';
import { useRef } from 'react';
import useRestById from '../../../hooks/rest-by-id';

export default function TableScreen () {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const restaurant = useRestById();
  const reserval = useAppSelector((state) => state.dataReseval);
  const tables = reserval.tables ? reserval.tables : [];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tableRef = useRef(null);

  const handleSubmitTable = (evt) => {
    evt.preventDefault();
    const tableNumber = parseInt(tableRef.current.value, 10);
    authorizationStatus === AuthorizationStatus.ADMIN_REST ? 
    dispatch(fetchTableAdminAction({
      name: reserval.name,
      phone: reserval.phone,
      date: reserval.date,
      timeStart: reserval.timeStart,
      timeEnd: reserval.timeEnd,
      persons: reserval.persons,
      message: reserval.message,
      table: tableNumber
    })) 
    : dispatch(fetchTableAction({
      id: restaurant.id,
      date: reserval.date,
      timeStart: reserval.timeStart,
      timeEnd: reserval.timeEnd,
      persons: reserval.persons,
      message: reserval.message,
      table: tableNumber
    }));
  }

  return (
    <>
      <Helmet>
        <title>TableTime</title>
      </Helmet>
      <Header/>
      <section className="main-table">
        <div className="table">
          <img className="plan__img" src={`data:image/jpeg;base64,${restaurant.plan}`} alt="открытое фото галереи"/>
          <div className="table__field"> 
            <label
              className="table__label"
              htmlFor="table-client"
            >
              ДОСТУПНЫЕ МЕСТА:
            </label>
            <select ref={tableRef} className="table__select" id="table-client" name="client">
              {tables.map((table) => (<option key={table} value={table}>{table}</option>))}
            </select>
          </div>
        </div>
        <div className="table-control">
          {authorizationStatus === AuthorizationStatus.ADMIN_REST 
          ? <button className="back__btn" onClick={() => navigate(AppRoute.Reserval)}></button> 
          : <button className="back__btn" onClick={() => navigate(`${AppRoute.Reserval}/${restaurant.id}`)}></button>}
          <button className="reserval__btn" onClick={handleSubmitTable}></button>
        </div>
      </section>
      <Footer/>
    </>
  );
}

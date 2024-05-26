import { Helmet } from 'react-helmet-async';
import './table-screen.css'
import Header from '../../../components/header/header';
import { useAppSelector, useAppDispatch } from '../../../hooks/hook';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { fetchTableAction } from '../../../store/api-actions';
import { useRef } from 'react';

export default function TableScreen () {
  const restaurant = useAppSelector((state) => state.dataRest);
  const reserval = useAppSelector((state) => state.dataReseval);
  const tables = reserval.tables ? reserval.tables : [];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tableRef = useRef(null);

  const handleSubmitTable = (evt) => {
    evt.preventDefault();
    const tableNumber = parseInt(tableRef.current.value, 10);
    dispatch(fetchTableAction({
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
        <img className="plan__img" src={`data:image/jpeg;base64,${restaurant.plan}`} alt="открытое фото галереи" width="1024" height="635"/>
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
        <button className="back__btn" onClick={() => navigate(`${AppRoute.Reserval}/${restaurant.id}`)}></button>
        <button className="reserval__btn" onClick={handleSubmitTable}></button>
      </section>
    </>
  );
}

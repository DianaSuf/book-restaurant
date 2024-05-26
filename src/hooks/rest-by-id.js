import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hook";
import { fetchRestaurantAction } from "../store/api-actions";

export default function useRestById() {
  const {id} = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchRestaurantAction({id: id}));
    }
  }, [dispatch, id]);

  const restaurant = useAppSelector((state) => state.dataRest);
  return restaurant;
}

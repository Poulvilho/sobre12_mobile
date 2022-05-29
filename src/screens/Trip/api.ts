import { AxiosResponse } from 'axios'
import sobre12Api from '../../services/api'

export interface Category {
  name: string
}

export interface Cost {
  name: string;
  value: number;
  category: Category;
}

const GetCosts = (async (
  userId: string,
  tripId: string,
): Promise<AxiosResponse<Array<Cost>>> => {
  const response = await sobre12Api.get<Array<Cost>>(
    `/cost/daily/${userId}/${tripId}`,
  );
  return response;
});

export {
  GetCosts,
}
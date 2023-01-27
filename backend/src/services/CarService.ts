import { prisma } from "../prisma";

export class CarService {

  async findAll() {
    return await prisma.car.findMany({
      include: {
        user: { select: { id: true, name: true }}
      }
    });
  }

  async findById(carId: number) {
    const car = await prisma.car.findFirst({
      where: { id: carId },
      include: {
        user: { select: { id: true, name: true } }
      }
    });
    return car;
  }

}
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { productRepository } from "../../../../../dev/mockRepository";
import { IProduct } from "../../../../domain/IProduct";
import {
  IInventoryData,
  IInventoryFormData,
  InventoryType,
} from "../../../../domain/IInventoryData";
import { dummyInventoryRepository } from "../../../../../dev/dummyInventoryRepository";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { formatToDate } from "../../../../utils/date";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [product, setProduct] = useState<IProduct>({
    id: "",
    name: "",
    description: "",
    price: 0,
  });

  const [data, setData] = useState<IInventoryData[]>([]);

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [message, setMessage] = useState("");
  const result = (severity: AlertColor, message: string) => {
    setOpen(true);
    setSeverity(severity);
    setMessage(message);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Simulate fetching product data
        const productInfo = await productRepository.getById(id ? id : "");
        if (productInfo === undefined) return;
        setProduct(productInfo);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        // Simulate fetching inventory data
        const inventoryData = await dummyInventoryRepository.getAll();
        setData(inventoryData);
      } catch (error) {
        console.error("Failed to fetch inventory data:", error);
      }
    };
    fetchInventoryData();
  }, [open]);

  const [action, setAction] = useState<InventoryType>(undefined);
  const onSubmit = (event) => {
    const lastData = data[data.length - 1];
    const formData: IInventoryFormData = {
      id: event.id ? event.id : "",
      quantity: Number(event.quantity),
      inventory:
        lastData.type === "purchase"
          ? lastData.inventory + lastData.quantity
          : lastData.inventory - lastData.quantity,
    };
    if (action === "purchase") {
      handlePurchase(formData);
    } else if (action === "sell") {
      handleSell(formData);
    } else {
      console.error("Invalid action type");
    }
    reset({
      quantity: null,
    });
  };

  const handlePurchase = (formData: IInventoryFormData) => {
    const data: IInventoryData = {
      id: formData.id,
      type: "purchase",
      date: formatToDate(new Date()),
      unit: product.price,
      quantity: formData.quantity,
      price: product.price * formData.quantity,
      inventory: formData.inventory,
    };
    dummyInventoryRepository.create(data);
    result("success", "商品を仕入れました。");
  };

  const handleSell = (formData: IInventoryFormData) => {
    const sellData = dummyInventoryRepository.create({
      id: formData.id,
      type: "sell",
      date: formatToDate(new Date()),
      unit: product.price,
      quantity: formData.quantity,
      price: product.price * formData.quantity,
      inventory: formData.inventory,
    });
    result("success", "商品を卸しました。");
    setData((prev) => [...prev, sellData]);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
      <Typography variant="h5">商品在庫管理</Typography>
      <Typography variant="h6">在庫処理</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <TextField
            disabled
            fullWidth
            id="name"
            label="商品名"
            variant="filled"
            value={product.name}
          />
        </Box>
        <Box>
          <TextField
            type="number"
            id="quantity"
            variant="filled"
            label="数量"
            {...register("quantity", {
              required: "必須入力です。",
              min: {
                value: 1,
                message: "1から99999999の数値を入力してください",
              },
              max: {
                value: 99999999,
                message: "1から99999999の数値を入力してください",
              },
            })}
            error={Boolean(errors.quantity)}
            helperText={errors.quantity?.message?.toString() || ""}
          />
        </Box>
        <Button
          variant="contained"
          type="submit"
          onClick={() => setAction("purchase")}
        >
          商品を仕入れる
        </Button>
        <Button
          variant="contained"
          type="submit"
          onClick={() => setAction("sell")}
        >
          商品を卸す
        </Button>
      </Box>
      <Typography variant="h6">在庫履歴</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>処理種別</TableCell>
              <TableCell>処理日時</TableCell>
              <TableCell>単価</TableCell>
              <TableCell>数量</TableCell>
              <TableCell>価格</TableCell>
              <TableCell>在庫数</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data, index) => (
              <TableRow key={index}>
                <TableCell>
                  {data.type == "purchase" ? "仕入れ" : "卸し"}
                </TableCell>
                <TableCell>{data.date}</TableCell>
                <TableCell>{data.unit}</TableCell>
                <TableCell>{data.quantity}</TableCell>
                <TableCell>{data.price}</TableCell>
                <TableCell>{data.inventory}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

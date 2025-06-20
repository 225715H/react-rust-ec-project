import {
  Alert,
  AlertColor,
  Box,
  Button,
  IconButton,
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
import {
  Add as AddIcon,
  Cancel as CancelIcon,
  Check as CheckIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../../../domain/IProduct";
import { productRepository } from "../../../../dev/mockRepository";

export default function ProductListPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [, setNewProduct] = useState<IProduct>({
    id: "",
    name: "",
    price: 0,
    description: "",
  });

  const [open, setOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [message, setMessage] = useState<string>("");
  const result = (serverity: AlertColor, message: string) => {
    setOpen(true);
    setSeverity(serverity);
    setMessage(message);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [id, setId] = useState<number | null>(0);
  const [action, setAction] = useState<string>("");
  const onSubmit = (event) => {
    const data: IProduct = {
      id: id?.toString() || "",
      name: event.name,
      price: Number(event.price),
      description: event.description,
    };

    if (action === "add") {
      handleAdd(data);
    } else if (action === "update") {
      if (data.id === "") return;
      handleUpdate(data);
    } else if (action === "delete") {
      if (data.id === "") return;
      handleDelete(data.id);
    }
  };

  const handleShowNewRow = () => {
    setId(null);
    reset({
      name: "",
      price: 0,
      description: "",
    });
  };

  const handleEditRow = (id: number | null) => {
    const selectedProduct = productRepository.getById(id?.toString() || "");
    if (selectedProduct === undefined) return;
    setId(Number(selectedProduct.id));
    reset({
      name: selectedProduct.name,
      price: selectedProduct.price,
      description: selectedProduct.description,
    });
  };

  const handleDelete = (id: string) => {
    try {
      productRepository.delete(id);
      console.log("商品情報が削除されました:", id);
      result("success", "商品情報が削除されました");
    } catch (error) {
      console.error("商品情報の削除に失敗しました:", error);
      alert("商品情報の削除に失敗しました。");
    }
    setId(0);
  };

  const handleAdd = async (data: IProduct) => {
    try {
      const addedProduct = await productRepository.set(data);
      console.log("商品情報が登録されました:", addedProduct);
      result("success", "商品情報が登録されました");
      setNewProduct({ id: "", name: "", price: 0, description: "" });
    } catch (error) {
      console.error("商品情報の登録に失敗しました:", error);
      alert("商品情報の登録に失敗しました。");
    }
    setId(0);
  };

  const handleUpdate = async (data: IProduct) => {
    try {
      const updatedProduct = await productRepository.update(data);
      console.log("商品情報が更新されました:", updatedProduct);
      result("success", "商品情報が更新されました");
      setNewProduct({ id: "", name: "", price: 0, description: "" });
    } catch (error) {
      console.error("商品情報の更新に失敗しました:", error);
      alert("商品情報の更新に失敗しました。");
    }
    setId(0);
  };

  const fetchProducts = async () => {
    try {
      const productList = await productRepository.getAll();
      setProducts(productList);
    } catch (error) {
      console.error("商品情報の取得に失敗しました:", error);
    }
  };

  const handleAddCancel = () => {
    setId(0);
  };

  const handleEditCancel = handleAddCancel;

  useEffect(() => {
    fetchProducts();
  }, [open]);

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
      <Typography variant="h5">商品一覧</Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => handleShowNewRow()}
      >
        商品を追加する
      </Button>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ height: 400, width: "100%" }}
      >
        <TableContainer component={Paper}>
          <Table
            sx={{
              display: { mobile: "none", desktop: "table" },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>商品ID</TableCell>
                <TableCell>商品名</TableCell>
                <TableCell>単価</TableCell>
                <TableCell>説明</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {id === null ? (
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      id="name"
                      {...register("name", {
                        required: "必須入力です。",
                        maxLength: {
                          value: 100,
                          message: "100文字以内の商品名を入力してください。",
                        },
                      })}
                      error={Boolean(errors.name)}
                      helperText={errors.name?.message?.toString() || ""}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      id="price"
                      {...register("price", {
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
                      error={Boolean(errors.price)}
                      helperText={errors.price?.message?.toString() || ""}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      id="description"
                      {...register("description")}
                    />
                  </TableCell>
                  {/* ルーティングのために追加 */}
                  <TableCell></TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      startIcon={<CancelIcon />}
                      onClick={() => handleAddCancel()}
                    >
                      キャンセル
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<CheckIcon />}
                      onClick={() => setAction("add")}
                    >
                      登録する
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                ""
              )}
              {products.map((data) =>
                id?.toString() === data.id ? (
                  <TableRow key={data.id}>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>
                      <TextField
                        type="text"
                        id="name"
                        {...register("name", {
                          required: "必須入力です。",
                          maxLength: {
                            value: 100,
                            message: "100文字以内の商品名を入力してください。",
                          },
                        })}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message?.toString() || ""}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        id="price"
                        {...register("price", {
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
                        error={Boolean(errors.price)}
                        helperText={errors.price?.message?.toString() || ""}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="text"
                        id="description"
                        {...register("description")}
                      />
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={() => handleEditCancel()}
                      >
                        キャンセル
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<CheckIcon />}
                        onClick={() => setAction("update")}
                      >
                        更新する
                      </Button>
                      <IconButton
                        aria-label="削除する"
                        type="submit"
                        color="warning"
                        onClick={() => setAction("delete")}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={data.id}>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.price}</TableCell>
                    <TableCell>{data.description}</TableCell>
                    <TableCell>
                      <Link to={`/inventory/products/${data.id}`}>
                        在庫処理
                      </Link>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="編集する"
                        color="primary"
                        onClick={() => handleEditRow(Number(data.id))}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

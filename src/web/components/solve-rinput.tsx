"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Solver, checkDuplicate, validToken } from "@/utils/utils";
import useModal from "@/hooks/use-modal";
import { useEffect, useState } from "react";
import Loading from "./loading";
// import FormRInput from "./form-rinput";

export const formSchema = z.object({
  numToken: z.coerce.number().min(2),
  token: z.string().min(1),
  bufferLen: z.coerce.number().min(2),
  baris: z.coerce.number().min(1),
  kolom: z.coerce.number().min(1),
  numSeq: z.coerce.number().min(1),
  maxLenSeq: z.coerce.number().min(2),
});

const SolveRInput = () => {
  const { setSolver, onOpen, setType } = useModal();
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (data: z.infer<typeof formSchema>) => {
    // console.log(data);
    setLoading(true);
    // console.log(isSubmitting);
    // console.log(loading);
    const solver = new Solver();

    const res = solver.readCli(data).calc();
    setSolver(res);
    setType("rinput");
    setLoading(false);
    onOpen();
  };

  const additionalCheck = () => {
    const num = Number.parseInt(form.getValues("numToken") as any);
    const tok = form.getValues("token");

    if (num !== tok.split(" ").length) {
      form.setError("numToken", {
        message: "the number of unique tokens does not match",
      });
      form.setError("token", {
        message: "the number of unique tokens does not match",
      });

      return false;
    }

    if (!validToken(tok.split(" "))) {
      form.setError("token", {
        message: "each token length must be equal to 2",
      });
      return false;
    }

    if (checkDuplicate(tok.split(" ")).length > 0) {
      form.setError("token", { message: "token must be unique" });
      return false;
    }

    return true;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      baris: 0,
      bufferLen: 0,
      kolom: 0,
      maxLenSeq: 0,
      numSeq: 0,
      numToken: 0,
      token: "",
    },
  });

  const { isSubmitting } = form.formState;

  console.log("submit", isSubmitting);
  return (
    <div>
      {loading && <Loading />}
      <div className="w-full">
        {/* <FormRInput setLoading={setLoading}/> */}
        <Form {...form}>
          <form
            onSubmit={async (e) => {
              // setLoading(true);

              e.preventDefault();
              additionalCheck() && (await form.handleSubmit(handleOnSubmit)(e));
              // setLoading(false);
            }}
            className="gap-3 flex flex-col"
          >
            <div className="flex w-full flex-wrap gap-3">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="numToken"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-400">
                        Number of Unique Token:{" "}
                      </FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 3" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="bufferLen"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-400">
                        Max Buffer Length:{" "}
                      </FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 3" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-400">Token: </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="7F 3D 4G YT" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full flex-wrap gap-3">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="kolom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-400">
                        Matrix Width:{" "}
                      </FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 3" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="baris"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-400">
                        Matrix Height:{" "}
                      </FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 3" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex w-full flex-wrap gap-3">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="numSeq"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-400">
                        Number of Sequence:{" "}
                      </FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 3" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="maxLenSeq"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-400">
                        Maximum Length of Sequence:{" "}
                      </FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 3" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full flex items-center justify-end">
              <Button size="lg" type="submit" disabled={loading}>
                {loading ? "Loading..." : "Solve"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SolveRInput;

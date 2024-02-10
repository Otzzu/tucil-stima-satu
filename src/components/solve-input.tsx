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
import { Textarea } from "./ui/textarea";
import { Solver } from "@/utils/utils";
import useModal from "@/hooks/use-modal";
import Loading from "./loading";
import { useState } from "react";

const formSchema = z.object({
  matrix: z.string().min(1),
  bufferLen: z.coerce.number().min(1),
  sequence: z.string().min(1),
  reward: z.string().min(1),
});

const SolveInput = () => {
  const { setSolver, onOpen, setType } = useModal();
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    // console.log(data);
    const solver = new Solver();

    const res = solver
      .readInput(data.bufferLen, data.matrix, data.sequence, data.reward)
      .calc();

    setSolver(res);
    setType("input");
    // console.log(res)
    setLoading(false);
    onOpen();
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bufferLen: 0,
      matrix: "",
      sequence: "",
      reward: "",
    },
  });
  return (
    <>
      {loading && <Loading />}
      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="gap-3 flex flex-col"
          >
            <FormField
              control={form.control}
              name="bufferLen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-400">
                    Buffer Length:{" "}
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ex: 3" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="matrix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-400">Matrix: </FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[300px] [word-spacing:20px] text-[25px]"
                      placeholder={`7A 55 E9 E9 1C 55
55 7A 1C 7A E9 55
55 1C 1C 55 E9 BD
BD 1C 7A 1C 55 BD
BD 55 BD 7A 1C 1C
1C 55 55 7A 55 7A`}
                      {...field}
                    />
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
                  name="sequence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-400">
                        Sequences:{" "}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[200px] [word-spacing:20px] text-[25px]"
                          placeholder={`BD E9 1C
BD 7A BD
BD 1C BD 55
`}
                          {...field}
                        />
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
                  name="reward"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-400">Reward: </FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[200px] [word-spacing:20px] text-[25px]"
                          placeholder={`15
20
30`}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full flex items-center justify-end">
              <Button size="lg" type="submit">
                Solve
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default SolveInput;

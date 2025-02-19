import { AgentConfig } from "@/app/types";

const returns: AgentConfig = {
  name: "returns",
  publicDescription:
    "Customer Service Agent specialized in order lookups, policy checks, and return initiations.",
  instructions: `
# パーソナリティとトーン
## アイデンティティ
あなたはスノーボード用品、特に返品に特化したオンラインストアのアシスタントです。冷静で親しみやすい性格です。何シーズンもスノーボードと用具のテストを重ねてきた経験があり、その専門知識を活かしてお客様の返品をサポートします。冷静さを保ちながらも、スノーボードへの情熱が根底にあります。信頼性と温かみのある対応で、一人一人のお客様に寄り添った対応を心がけます。

## タスク
主な目的は返品リクエストを専門的に処理することです。明確なガイダンスを提供し、詳細を確認し、お客様が安心して満足できるプロセスを確保します。返品対応だけでなく、将来のより良い選択のためにスノーボード用品についてのアドバイスも提供できます。

## 態度
リラックスしたフレンドリーな雰囲気を保ちながら、お客様のニーズに注意を払います。積極的に耳を傾け、共感を持って対応し、お客様が理解され、大切にされていると感じられるように努めます。

## トーン
丁寧な言葉遣いを交えた、温かみのある会話調で話します。スノーボード用品への熱意を控えめに表現し、押しつけがましくならないように注意します。

## 熱意のレベル
落ち着いた対応と控えめな熱意のバランスを取ります。スノーボードの魅力は理解していますが、返品対応という実務的な事項を過度な熱意で曇らせないようにします。

## フォーマリティのレベル
適度に専門的な対応を心がけます。丁寧で礼儀正しい言葉遣いを保ちながら、フレンドリーで親しみやすい態度を維持します。名前が分かる場合は、お客様のお名前でお呼びすることができます。

## 感情表現のレベル
サポーティブで理解を示す態度を取り、お客様が用具に関する不満や問題を説明する際は安心させるような声色で対応します。お客様の懸念に対して、思いやりのある誠実な態度で対応します。

## つなぎ言葉
会話を柔らかくし、より親しみやすい対応にするため、「えーと」「うーん」「あの」などのカジュアルなつなぎ言葉を時々使用します。ただし、気が散るほど多用しないように注意します。

## ペース
中程度のペースで、安定して明確に話します。お客様がガイダンスを理解する時間を確保するため、適度な間を取ることができます。

## その他の詳細
- 強いアクセントがあります。
- 全体的な目標は、お客様が質問や詳細の確認をしやすい雰囲気を作ることです。
- 名前や数字の確認は、間違いを避けるため必ず行います。

# 手順
1. まず注文詳細を理解します - お客様の電話番号を尋ね、照会し、商品を確認してから進めます
2. 返品を希望する理由についての詳細情報を尋ねます。
3. 返品の適格性の判断については「返品適格性の判断」を参照してください。

## 挨拶
- あなたは返品部門の担当者で、名前はジェーンです。
  - 例：「返品部門のジェーンでございます」
- 会話の文脈や転送理由を理解していることを伝え、信頼関係を築きます。
  - 例：「〇〇についてご相談とのことですね。早速対応させていただきます」

## 機能呼び出し前のメッセージ
- 機能を呼び出す前に、必ずお客様に次の手順を説明し、各ステップを認識してもらいます。
  - 例：「では、注文詳細を確認させていただきます」
  - 例：「関連する規定を確認させていただきます」
  - 例：「返品の可否について専門家に確認させていただきます」
- 機能呼び出しに数秒以上かかる場合は、必ず作業中であることをお客様に伝えます。（例：「もう少しお時間をいただけますでしょうか...」「申し訳ございません、ただいま確認中です」）
- お客様を10秒以上待たせないよう、必要に応じて作業状況の小さな更新や丁寧な会話を続けます。
  - 例：「お待たせして申し訳ございません、もう少しお時間をいただけますでしょうか...」

# 返品適格性の判断
- まず'lookupOrders()'で注文情報を取得し、購入日を含む該当商品の詳細を確認します。
- 次に、適格性を確認する前にお客様から問題の簡単な説明を求めます。
- checkEligibilityAndPossiblyInitiateReturn()を呼び出す前に、必ずretrievePolicy()で最新の規定を確認します。
- 返品を開始する前に、必ず'checkEligibilityAndPossiblyInitiateReturn()'で適格性を再確認します。
- 会話の中で新しい情報が出てきた場合（例：checkEligibilityAndPossiblyInitiateReturn()で要求された追加情報の提供など）、その情報をお客様に確認します。お客様がこの情報を提供した場合、新しい情報を含めてcheckEligibilityAndPossiblyInitiateReturn()を再度呼び出します。
- 有力なケースに見えても、最初に確認せずにお客様の希望する対応を約束することは控えめにします。確認の結果、お客様の要望に沿えない場合があり、それは良くない体験となります。
- 処理が完了したら、具体的な関連詳細と次のステップをお客様にお知らせします。

# 一般情報
- 本日の日付は2024年12月26日です
`,
  tools: [
    {
      type: "function",
      name: "lookupOrders",
      description:
        "Retrieve detailed order information by using the user's phone number, including shipping status and item details. Please be concise and only provide the minimum information needed to the user to remind them of relevant order details.",
      parameters: {
        type: "object",
        properties: {
          phoneNumber: {
            type: "string",
            description: "The user's phone number tied to their order(s).",
          },
        },
        required: ["phoneNumber"],
        additionalProperties: false,
      },
    },
    {
      type: "function",
      name: "retrievePolicy",
      description:
        "Retrieve and present the store's policies, including eligibility for returns. Do not describe the policies directly to the user, only reference them indirectly to potentially gather more useful information from the user.",
      parameters: {
        type: "object",
        properties: {
          region: {
            type: "string",
            description: "The region where the user is located.",
          },
          itemCategory: {
            type: "string",
            description:
              "The category of the item the user wants to return (e.g., shoes, accessories).",
          },
        },
        required: ["region", "itemCategory"],
        additionalProperties: false,
      },
    },
    {
      type: "function",
      name: "checkEligibilityAndPossiblyInitiateReturn",
      description: `Check the eligibility of a proposed action for a given order, providing approval or denial with reasons. This will send the request to an experienced agent that's highly skilled at determining order eligibility, who may agree and initiate the return.

# Details
- Note that this agent has access to the full conversation history, so you only need to provide high-level details.
- ALWAYS check retrievePolicy first to ensure we have relevant context.
- Note that this can take up to 10 seconds, so please provide small updates to the user every few seconds, like 'I just need a little more time'
- Feel free to share an initial assessment of potential eligibility with the user before calling this function.
`,
      parameters: {
        type: "object",
        properties: {
          userDesiredAction: {
            type: "string",
            description: "The proposed action the user wishes to be taken.",
          },
          question: {
            type: "string",
            description:
              "The question you'd like help with from the skilled escalation agent.",
          },
        },
        required: ["userDesiredAction", "question"],
        additionalProperties: false,
      },
    },
  ],
  toolLogic: {
    lookupOrders: ({ phoneNumber }) => {
      console.log(`[toolLogic] looking up orders for ${phoneNumber}`);
      return {
        orders: [
          {
            order_id: "SNP-20230914-001",
            order_date: "2024-09-14T09:30:00Z",
            delivered_date: "2024-09-16T14:00:00Z",
            order_status: "delivered",
            subtotal_usd: 409.98,
            total_usd: 471.48,
            items: [
              {
                item_id: "SNB-TT-X01",
                item_name: "Twin Tip Snowboard X",
                retail_price_usd: 249.99,
              },
              {
                item_id: "SNB-BOOT-ALM02",
                item_name: "All-Mountain Snowboard Boots",
                retail_price_usd: 159.99,
              },
            ],
          },
          {
            order_id: "SNP-20230820-002",
            order_date: "2023-08-20T10:15:00Z",
            delivered_date: null,
            order_status: "in_transit",
            subtotal_usd: 339.97,
            total_usd: 390.97,
            items: [
              {
                item_id: "SNB-PKbk-012",
                item_name: "Park & Pipe Freestyle Board",
                retail_price_usd: 189.99,
              },
              {
                item_id: "GOG-037",
                item_name: "Mirrored Snow Goggles",
                retail_price_usd: 89.99,
              },
              {
                item_id: "SNB-BIND-CPRO",
                item_name: "Carving Pro Binding Set",
                retail_price_usd: 59.99,
              },
            ],
          },
        ],
      };
    },
    retrievePolicy: () => {
      return `
At Snowy Peak Boards, we believe in transparent and customer-friendly policies to ensure you have a hassle-free experience. Below are our detailed guidelines:

1. GENERAL RETURN POLICY
• Return Window: We offer a 30-day return window starting from the date your order was delivered. 
• Eligibility: Items must be unused, in their original packaging, and have tags attached to qualify for refund or exchange. 
• Non-Refundable Shipping: Unless the error originated from our end, shipping costs are typically non-refundable.

2. CONDITION REQUIREMENTS
• Product Integrity: Any returned product showing signs of use, wear, or damage may be subject to restocking fees or partial refunds. 
• Promotional Items: If you received free or discounted promotional items, the value of those items might be deducted from your total refund if they are not returned in acceptable condition.
• Ongoing Evaluation: We reserve the right to deny returns if a pattern of frequent or excessive returns is observed.

3. DEFECTIVE ITEMS
• Defective items are eligible for a full refund or exchange within 1 year of purchase, provided the defect is outside normal wear and tear and occurred under normal use. 
• The defect must be described in sufficient detail by the customer, including how it was outside of normal use. Verbal description of what happened is sufficient, photos are not necessary.
• The agent can use their discretion to determine whether it's a true defect warranting reimbursement or normal use.
## Examples
- "It's defective, there's a big crack": MORE INFORMATION NEEDED
- "The snowboard has delaminated and the edge came off during normal use, after only about three runs. I can no longer use it and it's a safety hazard.": ACCEPT RETURN

4. REFUND PROCESSING
• Inspection Timeline: Once your items reach our warehouse, our Quality Control team conducts a thorough inspection which can take up to 5 business days. 
• Refund Method: Approved refunds will generally be issued via the original payment method. In some cases, we may offer store credit or gift cards. 
• Partial Refunds: If products are returned in a visibly used or incomplete condition, we may process only a partial refund.

5. EXCHANGE POLICY
• In-Stock Exchange: If you wish to exchange an item, we suggest confirming availability of the new item before initiating a return. 
• Separate Transactions: In some cases, especially for limited-stock items, exchanges may be processed as a separate transaction followed by a standard return procedure.

6. ADDITIONAL CLAUSES
• Extended Window: Returns beyond the 30-day window may be eligible for store credit at our discretion, but only if items remain in largely original, resalable condition. 
• Communication: For any clarifications, please reach out to our customer support team to ensure your questions are answered before shipping items back.

We hope these policies give you confidence in our commitment to quality and customer satisfaction. Thank you for choosing Snowy Peak Boards!
`;
    },
    checkEligibilityAndPossiblyInitiateReturn: async (args, transcriptLogs) => {
      console.log("checkEligibilityAndPossiblyInitiateReturn()", args);
      const nMostRecentLogs = 10;
      const messages = [
        {
          role: "system",
          content:
            "You are an an expert at assessing the potential eligibility of cases based on how well the case adheres to the provided guidelines. You always adhere very closely to the guidelines and do things 'by the book'.",
        },
        {
          role: "user",
          content: `Carefully consider the context provided, which includes the request and relevant policies and facts, and determine whether the user's desired action can be completed according to the policies. Provide a concise explanation or justification. Please also consider edge cases and other information that, if provided, could change the verdict, for example if an item is defective but the user hasn't stated so. Again, if ANY CRITICAL INFORMATION IS UNKNOWN FROM THE USER, ASK FOR IT VIA "Additional Information Needed" RATHER THAN DENYING THE CLAIM.

<modelContext>
${JSON.stringify(args, null, 2)}
</modelContext>

<conversationContext>
${JSON.stringify(transcriptLogs.slice(nMostRecentLogs), args, 2)}
</conversationContext>

<output_format>
# Rationale
// Short description explaining the decision

# User Request
// The user's desired outcome or action

# Is Eligible
true/false/need_more_information
// "true" if you're confident that it's true given the provided context, and no additional info is needex
// "need_more_information" if you need ANY additional information to make a clear determination.

# Additional Information Needed
// Other information you'd need to make a clear determination. Can be "None"

# Return Next Steps
// Explain to the user that the user will get a text message with next steps. Only if is_eligible=true, otherwise "None". Provide confirmation to the user the item number, the order number, and the phone number they'll receive the text message at.
</output_format>  
`,
        },
      ];

      const model = "o1-mini";
      console.log(`checking order eligibility with model=${model}`);

      const response = await fetch("/api/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model, messages }),
      });

      if (!response.ok) {
        console.warn("Server returned an error:", response);
        return { error: "Something went wrong." };
      }

      const completion = await response.json();
      console.log(completion.choices[0].message.content);
      return { result: completion.choices[0].message.content };
    },
  },
};

export default returns;

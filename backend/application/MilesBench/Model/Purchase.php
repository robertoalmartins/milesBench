<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Purchase
 *
 * @ORM\Table(name="purchase", uniqueConstraints={@ORM\UniqueConstraint(name="id_UNIQUE", columns={"id"})}, indexes={@ORM\Index(name="fk_purchase_Cards1_idx", columns={"cards_id"})})
 * @ORM\Entity
 */
class Purchase
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=2000, nullable=true)
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="purchase_miles", type="decimal", precision=20, scale=0, nullable=false)
     */
    private $purchaseMiles;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="purchase_date", type="datetime", nullable=false)
     */
    private $purchaseDate;

    /**
     * @var string
     *
     * @ORM\Column(name="cost_per_thousand", type="decimal", precision=20, scale=0, nullable=false)
     */
    private $costPerThousand;

    /**
     * @var string
     *
     * @ORM\Column(name="total_cost", type="decimal", precision=20, scale=0, nullable=true)
     */
    private $totalCost;

    /**
     * @var string
     *
     * @ORM\Column(name="aproved", type="string", length=1, nullable=true)
     */
    private $aproved;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="miles_due_date", type="datetime", nullable=false)
     */
    private $milesDueDate;

    /**
     * @var \Cards
     *
     * @ORM\ManyToOne(targetEntity="Cards")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="cards_id", referencedColumnName="id")
     * })
     */
    private $cards;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Purchase
     */
    public function setDescription($description)
    {
        $this->description = $description;
    
        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set purchaseMiles
     *
     * @param string $purchaseMiles
     * @return Purchase
     */
    public function setPurchaseMiles($purchaseMiles)
    {
        $this->purchaseMiles = $purchaseMiles;
    
        return $this;
    }

    /**
     * Get purchaseMiles
     *
     * @return string 
     */
    public function getPurchaseMiles()
    {
        return $this->purchaseMiles;
    }

    /**
     * Set purchaseDate
     *
     * @param \DateTime $purchaseDate
     * @return Purchase
     */
    public function setPurchaseDate($purchaseDate)
    {
        $this->purchaseDate = $purchaseDate;
    
        return $this;
    }

    /**
     * Get purchaseDate
     *
     * @return \DateTime 
     */
    public function getPurchaseDate()
    {
        return $this->purchaseDate;
    }

    /**
     * Set costPerThousand
     *
     * @param string $costPerThousand
     * @return Purchase
     */
    public function setCostPerThousand($costPerThousand)
    {
        $this->costPerThousand = $costPerThousand;
    
        return $this;
    }

    /**
     * Get costPerThousand
     *
     * @return string 
     */
    public function getCostPerThousand()
    {
        return $this->costPerThousand;
    }

    /**
     * Set totalCost
     *
     * @param string $totalCost
     * @return Purchase
     */
    public function setTotalCost($totalCost)
    {
        $this->totalCost = $totalCost;
    
        return $this;
    }

    /**
     * Get totalCost
     *
     * @return string 
     */
    public function getTotalCost()
    {
        return $this->totalCost;
    }

    /**
     * Set aproved
     *
     * @param string $aproved
     * @return Purchase
     */
    public function setAproved($aproved)
    {
        $this->aproved = $aproved;
    
        return $this;
    }

    /**
     * Get aproved
     *
     * @return string 
     */
    public function getAproved()
    {
        return $this->aproved;
    }

    /**
     * Set milesDueDate
     *
     * @param \DateTime $milesDueDate
     * @return Purchase
     */
    public function setMilesDueDate($milesDueDate)
    {
        $this->milesDueDate = $milesDueDate;
    
        return $this;
    }

    /**
     * Get milesDueDate
     *
     * @return \DateTime 
     */
    public function getMilesDueDate()
    {
        return $this->milesDueDate;
    }

    /**
     * Set cards
     *
     * @param \Cards $cards
     * @return Purchase
     */
    public function setCards(\Cards $cards = null)
    {
        $this->cards = $cards;
    
        return $this;
    }

    /**
     * Get cards
     *
     * @return \Cards 
     */
    public function getCards()
    {
        return $this->cards;
    }
}
